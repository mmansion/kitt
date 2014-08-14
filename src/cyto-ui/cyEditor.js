define([
  'cm/lib/codemirror', 
  'cm/mode/javascript/javascript'
  ], function (CodeMirror) {

  var cyEditor = function() {

    console.log("new cyEditor instantiated");

    console.log(document.getElementById('code'));

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
  };

  return new cyEditor;
});