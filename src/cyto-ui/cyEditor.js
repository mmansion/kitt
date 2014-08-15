define([
  
  'cm/lib/codemirror', 
  'cm/mode/javascript/javascript'

  ], function (CodeMirror) {

  var cyEditor = function() {

    var codeArea = document.getElementById('code')
      , submitBtn = document.getElementById('save')
      , codeMirro = CodeMirror
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
  };

  return new cyEditor;
});