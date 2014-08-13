define(['codemirror'], function (CodeMirror) {

  var cyEditor = function() {

    console.log("new cyEditor instantiated");

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