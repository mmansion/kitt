'use strict';

define(['angular', 'services'], function (angular) {

  /* Controllers Directory */

  return angular.module('cytoApp.controllers', ['cytoApp.services'])

    /**
     *
     * Ctyo UI Controllers
     *
     */

    //controller is required from an external file
    .controller('TimelineCtrl', ['$scope', '$injector', function($scope, $injector) {
      require(['controllers/timeline-ctrl'], function(timelineCtrl) {

        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(timelineCtrl, this, {'$scope': $scope});
      });
    }])

    //controller is required from an external file
    .controller('EditorCtrl', ['$scope', '$injector', function($scope, $injector) {
      require(['controllers/editor-ctrl'], function(editorCtrl) {

        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(editorCtrl, this, {'$scope': $scope});
      });
    }])
});