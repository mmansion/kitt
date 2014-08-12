'use strict';

define(['angular', 'services'], function (angular) {

  /* Controller Directory */

  return angular.module('cytoApp.controllers', ['cytoApp.services'])


    /**
     *
     * Ctypo Widgets
     *
     */

    //controller is required from an external file
    .controller('MyCtrl1', ['$scope', '$injector', function($scope, $injector) {
      require(['controllers/myctrl1'], function(myctrl2) {

        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(myctrl2, this, {'$scope': $scope});
      });
    }])

    //controller is required from an external file
    .controller('EditorCtrl', ['$scope', '$injector', function($scope, $injector) {
      require(['controllers/editor'], function(myctrl2) {

        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(myctrl2, this, {'$scope': $scope});
      });
    }])
});