/**
 * Created by Bryant on 2016/12/1.
 */
requirejs.config({
  paths: {
    jQuery: '/scripts/libs/jquery-3.1.1',
    Underscore: '/scripts/libs/underscore',
    Backbone: '/scripts/libs/backbone',
    text: '/scripts/libs/text',
    templates: '../templates'
  },
  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    'social-network': ['Backbone']
  }
});

requirejs(['social-network'], function (SocialNetwork) {
  SocialNetwork.initialize();
});