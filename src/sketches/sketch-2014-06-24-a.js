var radius = 70
  , cy     = cyto;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

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
  cy.fill();
  cy.strokeStyle = '#003300';
  cy.stroke();

  cy.ellipse(cy.mouseX, cy.mouseY, 150, 150, true);
}