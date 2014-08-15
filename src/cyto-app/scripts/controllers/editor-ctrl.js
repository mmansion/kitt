define(['cyEditor'], function(cyEditor) {

  return ['$scope', '$http', function($scope, $http) {

    $scope.init = function () {
      
      
      console.log("Editor Controller Loaded");

    }

    // You can access the scope of the controller from here
    $scope.welcomeMessage = 'cyEditor!';

    $scope.userType = 'guest';

    $scope.submit = function() {
      console.log("submit clicked");
    };

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();

    $scope.init();
  }];
});
