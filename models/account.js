/**
 * Created by Bryant on 2016/12/1.
 */
module.exports = function (config, mongoose, nodemailer) {
  var crypto = require('crypto');

  var accountSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: {
      first: { type: String },
      last: { type: String }
    },
    birthday: {
      day: { type: Number, min: 1, max: 31, required: false },
      month: { type: Number, min: 1, max: 12, required: false },
      year: { type: Number }
    },
    photoUrl: { type: String },
    biography: { type: String }
  });

  var account = mongoose.model('account', accountSchema);

  var registerCallback = function (err) {
    if (err) {
      return console.log(err);
    }
    return console.log('账号创建成功');
  };

  var changePassword = function (accountId, newPassword) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(newPassword);
    var hashedPassword = shaSum.digest('hex');
    account.update({_id: accountId}, {$set: {password: hashedPassword}}, {upsert: false}, function (err) {
      console.log('账号' + accountId + '的密码已修改')
    })
  };

  var forgotPassword = function (email, resetPasswordUrl, callback) {
    var user = account.findOne({email: email}, function (err, doc) {
      if (err) {
        callback(false);
      } else {
        var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
        resetPasswordUrl += '?account=' + doc._id;
        smtpTransport.sendMail({
          from: 'wangwenhao@live.cn',
          to: doc.email,
          subject: 'Social Network Password Request',
          text: 'Click here to reset your password: ' + resetPasswordUrl
        }, function (err) {
          if (err) {
            callback(false);
          } else {
            callback(true);
          }
        });
      }
    });
  };

  var login = function (email, password, callback) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    account.findOne({email: email, password: shaSum.digest('hex')}, function (err, doc) {
      callback(null!=doc);
    })
  };

  var register = function (email, password, firstName, lastName) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);
    var user = new account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      password: shaSum.digest('hex')
    });
    user.save(registerCallback);
  };

  return {
    register: register,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    login: login,
    account: account
  }
};