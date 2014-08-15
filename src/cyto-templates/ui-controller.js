define(['cyUiClassName'], function(CyUiClassName) {

  return ['$scope', '$http', function($scope, $http) {

    //passes $scope into the ui controller's class
    var cyUiClassName = new CyUiClassName($scope);
   
    // Because controller is loaded asynchronously Angular's initial call
    // to $apply gets missed, and we have to explicitly call it.
    $scope.$apply(function() {

      //calls init on the scope, which should be defined within the ui class
      $scope.init();
    });
  }];
});
