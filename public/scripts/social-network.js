/**
 * Created by Bryant on 2016/12/1.
 */
define(['views/index'], function (indexView) {
  var initialize = function () {
    indexView.render();
  };

  return {
    initialize: initialize
  }
});