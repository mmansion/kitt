//Conway's Game of Life in Cyto

var grid;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  grid = new cy.Grid({
    scale:  2,
    width:  20,
    height: 40,
    stepX:  10,
    stepY:  10,
    x:      50,
    y:      50
  });

  grid.draw();

  //console.log(grid.cell);

};

/* Update
  --------------------------------------------------- */
cyto.update = function() {

};

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {


};