/**
 * Created by Bryant on 2016/12/1.
 */
define(['text!templates/index.html'], function (indexTemplate) {
  var indexView = Backbone.View.extend({
    el: $('#content'),
    render: function () {
      this.$el.html(indexTemplate);
    }
  });

  return new indexView;
});