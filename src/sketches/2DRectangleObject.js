var rectangle;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  rectangle = new cy.Rectangle({
    drawCenter: true,
    fillStyle: 'blue'
  });

  console.log(rectangle.left);
  
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

}

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.bg('#011722');
  
  //draws from instance (preserved settings)
  rectangle.draw();

  //draws directly from root object (not preserved)
  cy.fill('lightblue');
  cy.noStroke();
  cy.drawCenter = true;
  cy.rect(400, 400, 200, 200, 30);

  cy.noFill();
  cy.stroke('orange');
  cy.drawCenter = false;
  cy.rect(500, 200, 100, 100, 20);
}