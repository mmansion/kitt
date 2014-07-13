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


  grid.cell(0, 0, true);
  grid.cell(0, 1, true);
  //grid.cell(0, 2, true);

};

/* Update
  --------------------------------------------------- */
cyto.update = function() {

};

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {


};