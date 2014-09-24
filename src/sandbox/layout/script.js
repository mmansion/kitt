$(function() {
  console.log("loaded layout script");


  $(".resizable-outer").resizable({ 
    minWidth: 100,
    maxWidth: $(window).width() - 50,
    handles: "w" 
  });

  $("#w1").resizable({ 
    minWidth: 50,
    maxWidth: $(window).width() - 50,
    containment: 'parent',
    alsoResize: '#w2',
    handles: "e" 
  });

  $("#w2").resizable({ 
    minWidth: 50,
    maxWidth: $(window).width() - 50,
    containment: 'parent',
    alsoResize: '#w1',
    handles: "e" 
  });

  $("#w3").resizable({ 
    minWidth: 50,
    maxWidth: $(window).width() - 50,
    containment: 'parent',
    //alsoResize: '#w2',
    handles: "e, w",
    resize: function(e) {
      console.log(e);
    }
  });


});
