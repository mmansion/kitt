define(['codemirror'], function(CodeMirror) {

  return ['$scope', '$http', function($scope, $http) {

    $scope.init = function () {
      console.log("Editor Controller Loaded");

      var myCodeMirror = CodeMirror
        .fromTextArea(document.getElementById('code'), {
        mode:  "javascript",
        styleActiveLine: true,
        matchBrackets: true,
        indentUnit: 2,
        smartIndent: true,
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true,
        theme: 'default'
      });

    }

    // You can access the scope of the controller from here
    $scope.welcomeMessage = 'hey this is myctrl2.js!';

    // because this has happened asynchroneusly we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicityly call it at the end of our Controller constructor
    $scope.$apply();

    $scope.init();
  }];
});
