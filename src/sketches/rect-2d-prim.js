/* Setup
  --------------------------------------------------- */
cy.setup = function() {

}

/* Update
  --------------------------------------------------- */
cy.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cy.draw = function() {

  cy.bg();
  cy.fill('green');
  cy.noStroke();
  cy.drawCenter();
  cy.rect(400, 400, 200, 200, 30);

  cy.noFill();
  cy.stroke('red');
  cy.rect(500, 200, 100, 100, 20);
}