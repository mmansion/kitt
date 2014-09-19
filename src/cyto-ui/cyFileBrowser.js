define([

  'jquery',
  'jqueryUi',

  ], function ($, jqueryUi) {

  var CyFileBrowser = function($scope, $http) {

    var $cyFileBrowser = $scope;

    $cyFileBrowser.init = function() {

      // ui init
    };

    $cyFileBrowser.onSomeEvent = function () {

      // event handler
    };

    return $cyFileBrowser;
  };

  return CyFileBrowser;
});