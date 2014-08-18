define([
  
  'cm/lib/codemirror', 
  'cm/mode/javascript/javascript'

  ], function (CodeMirror) {

  var CyEditor = function($scope, $http) {

    $scope.init = function() {

      this.codeArea   = document.getElementById('code');
      this.submitBtn  = document.getElementById('save');

      this.codeMirror = CodeMirror.fromTextArea(this.codeArea, {
        mode             : 'javascript',
        styleActiveLine  : true,
        matchBrackets    : true,
        indentUnit       : 2,
        smartIndent      : true,
        tabSize          : 2,
        indentWithTabs   : false,
        lineNumbers      : true,
        theme            : 'default'
      });
    };

    $scope.submit = function() {
      //console.log(this.codeMirror.getValue());
      $http({
        method: 'POST',
        url: '/api/v1/sketch/test'
      }).
      success(function (data, status, headers, config) {
        //$scope.name = data.name;
        console.log("SUCCESS");
      }).
      error(function (data, status, headers, config) {
        //$scope.name = 'Error!';

        console.log("ERROR");
      });
    };


  };

  return CyEditor;
});