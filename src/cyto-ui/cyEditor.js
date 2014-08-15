define([
  
  'cm/lib/codemirror', 
  'cm/mode/javascript/javascript'

  ], function (CodeMirror) {

  var CyEditor = function($scope) {

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
      console.log(this.codeMirror.getValue());
    };
  };

  return CyEditor;
});