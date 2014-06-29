var radius = 70
  , cy     = cyto

  , ellipse1, ellipse2;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  ellipse1 = new cy.Ellipse({x: cy.centerX, y: cy.centerY, width: 100, height: 100});
  ellipse2 = new cy.Ellipse({x: 400, y: 400, width: 100, height: 100});

}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.bg();

  cy.fillStyle = 'green';

  //draws an ellipse without instantiation
  cy.ellipse(cy.mouseX, cy.mouseY, 150, 150, true);
 
  cy.fillStyle = 'orange';

  ellipse1.draw();

  cy.fillStyle = 'red';

  ellipse2.draw();

}