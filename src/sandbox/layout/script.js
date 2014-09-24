$(function() {
  console.log("loaded layout script");

  function resizeAll(e,ui) {

    var delta = 0;

    //getDirection(ui.position.left, ui.originalPosition.left);

    if($(this).data('last-left')) {
      delta =  $(this).data('last-left') - ui.position.left;
    }
    
    $(this).data('last-left', ui.position.left );

    if(delta !== 0) {

      if(this.id === 'widgets-panel') {
        $('.resizable').each(function(i,elem){
          $(elem).width( $(elem).width() + (delta/3) );
          //elem.width(delta/3);
        });
      }
    }

    return;
    console.log(this.id);
    console.log(this.style.width);
    // var parentWidth =  
    // var panel1Width =
  }


  function getDirection(left, prevLeft) {
    console.log(left > prevLeft);
  }

  $("#widgets-panel").resizable({ 
    minWidth: 100,
    maxWidth: $(window).width() - 50,
    handles: "w",
    resize: resizeAll
  });

  // $(".resizable").resizable({ 
  //   minWidth: 50,
  //   maxWidth: $(window).width() - 50,
  //   containment: 'parent',
  //   //alsoResize: '#w2',
  //   handles: "e, w",
  //   resize: resizeAll
  // });


});
