const toolbarButton = text => cy.contains('[data-testid="toolbar-button"]', text);

context('Toolbar', () => {
  describe('Clear Button', () => {
    it('can clear the board', () => {
      cy.visit('/');

      cy.getFirstByTestId('draggable-piece').as('draggedPiece');
      cy.getFirstByTestId('droppable-square').as('dropSquare');
      cy.movePiece('@draggedPiece', '@dropSquare');

      cy.get('@dropSquare')
        .invoke('text')
        .should('not.be.empty');
      toolbarButton('Clear').invoke('click');
      cy.get('@dropSquare')
        .invoke('text')
        .should('be.empty');
    });
  });
});
