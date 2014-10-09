$(function() {
  console.log("loaded layout script");

  var numberVisible = 3;
  var MAX_WIDGET_PANEL_WIDTH = 200;
  var MIN_WIDGET_PANEL_WIDTH = 50;

  var capWidthAt = false;

  $("#widgets-panel").on('mousedown', function(){
    console.log("mouse down");
  });

   $("#widgets-panel").on('mouseup', function(){
    if(capWidthAt) capWidthAt = false;
  });

  function resizeAll(e,ui) {

    // if(capWidthAt) {
    //   ui.size.width = capWidthAt;
    //   return;
    //   //$this.width(capWidthAt);
    // }

    var dir = getDirection(ui.size.width, ui.prevSize.width) ? 'out' : 'in';

    var id = parseInt(this.id.replace('w', ''));
    var $this = $(this);
    var numberToResize = numberVisible - id;
    var deltaWidth = ui.prevSize.width - ui.size.width;
    var lastElemNum = numberVisible;

    var sumOfWidths = 0;
    $(".resizable").each(function() {   
      sumOfWidths += $(this).width();
    });

    if(dir == 'out') {

      if(id === lastElemNum && sumOfWidths > MAX_WIDGET_PANEL_WIDTH * 3) {
        var remainderWidth = (MAX_WIDGET_PANEL_WIDTH * 3) - (sumOfWidths - $(this).width());

        $(this).width(remainderWidth);
        return;

      } else if(id < lastElemNum && $this.next().width() <= MIN_WIDGET_PANEL_WIDTH) {
        
          if(!capWidthAt) {
            capWidthAt = ui.prevSize.width;
          }

          ui.size.width = capWidthAt;
          $this.width(capWidthAt);
          return;


      }

    } else {
      if(capWidthAt) capWidthAt = false;
    }

    for(var i = id+1; i < id+2; i++) {
      var $e = $('#w'+i)
        , w  = $e.width();

      $e.width(w + deltaWidth);
    }

    //getDirection(ui.size.width, ui.prevSize.width);

    return;


    if($(this).data('last-left')) {
      delta =  $(this).data('last-left') - ui.position.left;
    }
    
    $(this).data('last-left', ui.position.left );

    // if(delta !== 0) {

    //   if(this.id === 'widgets-panel') {
    //     $('.resizable').each(function(i,elem){
    //       $(elem).width( $(elem).width() + (delta/4) );
    //       //elem.width(delta/3);
    //     });
    //   }
    // }

    return;
    console.log(this.id);
    console.log(this.style.width);
    // var parentWidth =  
    // var panel1Width =
  }


  function getDirection(currWidth, prevWidth) {
    return currWidth > prevWidth;
  }

  // $("#widgets-panel").resizable({ 
  //   minWidth: 100,
  //   maxWidth: $(window).width() - 50,
  //   handles: "w",
  //   resize: resizeAll
  // });

  $(".resizable").resizable({ 
    minWidth: MIN_WIDGET_PANEL_WIDTH,
    //maxWidth: MAX_WIDGET_PANEL_WIDTH * ,
    containment: 'parent',
    //alsoResize: '#w2',
    handles: "e",
    resize: resizeAll
  });


});
