define(['cyEditor'], function(CyEditor) {

  return ['$scope', '$http', function($scope, $http) {

    var cyEditor;

    $scope.init = function () { //initialize controller

      cyEditor = new CyEditor($scope);
      
    }

    // You can access the scope of the controller from here
    $scope.welcomeMessage = 'cyEditor!';

    $scope.userType = 'guest';

   
    // Because controller is loaded asynchronously Angular's initial call
    // to $apply gets missed, and we have to explicitly call it.

    $scope.$apply();
    $scope.init();
  }];
});
