//Conway's Game of Life in Cyto

var grid;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  grid = new cy.Grid({
    scale       : 1.5,
    width       : 500,
    height      : 300,
    strokeStyle : '#333',
    fillStyle   : '#AAA',
    stepX       : 10,
    stepY       : 10,
    x           : 50,
    y           : 50
  });

  grid.draw();

  grid.cell(0, 0, true);
  grid.cell(1, 1, true);
  grid.cell(2, 2, true);
  grid.cell(3, 3, true);
  grid.cell(4, 4, true);
  grid.cell(5, 5, true);
  grid.cell(6, 6, true);
  grid.cell(7, 7, true);
  grid.cell(8, 8, true);
  grid.cell(9, 9, true);

  grid.draw();


  grid.cells.forEach(function(cell) {
    console.log(cell);
  });

};

/* Update
  --------------------------------------------------- */
cyto.update = function() {

};

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {


};