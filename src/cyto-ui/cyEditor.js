define([
  
  'cm/lib/codemirror', 
  'cm/mode/javascript/javascript'

  ], function (CodeMirror) {

  var CyEditor = function($scope, $http) {

    //ref: http://pastebin.com/KTJgzWf4

    var $cyEditor = $scope;

    $cyEditor.init = function() {

      $cyEditor.codeArea   = document.getElementById('code');
      $cyEditor.submitBtn  = document.getElementById('save');

      $cyEditor.codeMirror = CodeMirror.fromTextArea($cyEditor.codeArea, {
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

    $cyEditor.submit = function() {
      var postData = { sketch: $cyEditor.codeMirror.getValue() };

      $http({
        method: 'POST',
        url:    '/api/v1/sketch/save',
        data:   JSON.stringify(postData)
      }).
      success(function (data, status, headers, config) {
        console.log(data, status, headers, config);
      }).
      error(function (data, status, headers, config) {
        console.log(data, status, headers, config);
      });
    };

    return $cyEditor;
  };

  return CyEditor;
});