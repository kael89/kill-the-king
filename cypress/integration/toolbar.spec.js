import { INITIAL_BOARD } from '../../src/modules/board';

const toolbarButton = text => cy.contains('[data-testid="toolbar-button"]', new RegExp(text, 'i'));
const boardObject = () =>
  cy
    .getById('square')
    .filter(':not([data-piece=null])')
    .then($squares => {
      const pairs = $squares.get().map(square => [square.dataset.position, JSON.parse(square.dataset.piece)]);
      return Cypress._.fromPairs(pairs);
    });

context('Toolbar', () => {
  describe('Clear Button', () => {
    it('can clear the board', () => {
      cy.visit('/');

      cy.getById('droppable-square')
        .first()
        .as('dropSquare');
      cy.movePiece('', '@dropSquare');

      cy.get('@dropSquare')
        .invoke('text')
        .should('not.be.empty');
      toolbarButton('Clear').invoke('click');
      cy.get('@dropSquare')
        .invoke('text')
        .should('be.empty');
    });
  });

  describe('Default Board Button', () => {
    it('can set an empty board to its default state', () => {
      cy.visit('/');

      toolbarButton('Default Board').invoke('click');
      boardObject().should('deep.equal', INITIAL_BOARD);
    });
    it('can set a filled board to its default state', () => {
      cy.visit('/');

      cy.movePiece();
      toolbarButton('Default Board').invoke('click');
      boardObject().should('deep.equal', INITIAL_BOARD);
    });
  });
});
