const getByTestId = testId => cy.get(`[data-testid="${testId}"]`);
Cypress.Commands.add('getByTestId', getByTestId);
Cypress.Commands.add('getFirstByTestId', testId => getByTestId(testId).first());

Cypress.Commands.add('movePiece', (pieceSelector, targetSquareSelector) => {
  cy.get(pieceSelector).trigger('dragstart');
  cy.get(targetSquareSelector).trigger('drop');
  cy.get(pieceSelector).trigger('dragend');
});
