import { INITIAL_BOARD } from '../../src/modules/board';
import { boardObject, idToSelector, movePiece } from '../support';

const toolbarButton = text => cy.contains(idToSelector('toolbar-button'), new RegExp(text, 'i'));

beforeEach(() => {
  cy.visit('/');
});

context('Toolbar', () => {
  describe('Clear Button', () => {
    beforeEach(() => {
      toolbarButton('Clear').as('clearButton');
    });

    it('can clear the board', () => {
      cy.getById('droppable-square')
        .first()
        .as('dropSquare');
      movePiece('', '@dropSquare');

      cy.get('@dropSquare')
        .invoke('text')
        .should('not.be.empty');
      cy.get('@clearButton').invoke('click');
      cy.get('@dropSquare')
        .invoke('text')
        .should('be.empty');
    });
  });

  describe('Default Board Button', () => {
    beforeEach(() => {
      toolbarButton('Default Board').as('defaultBoardButton');
    });

    it('can set an empty board to its default state', () => {
      cy.get('@defaultBoardButton').invoke('click');
      boardObject().should('deep.equal', INITIAL_BOARD);
    });
    it('can set a filled board to its default state', () => {
      movePiece();
      cy.get('@defaultBoardButton').invoke('click');
      boardObject().should('deep.equal', INITIAL_BOARD);
    });
  });

  describe('Import Button', () => {
    beforeEach(() => {
      toolbarButton('Import').click();

      cy.getById('import-dialog').as('importDialog');
      cy.get('@importDialog')
        .find('textarea')
        .as('importInput');
      cy.get('@importDialog')
        .contains('button', 'Import')
        .as('importButton');
    });

    it('cannot import empty/no data', () => {
      cy.get('@importButton').should('be.disabled');
      cy.get('@importInput').type('   ');
      cy.get('@importButton').should('be.disabled');
      boardObject().should('be.empty');
    });
    it('cannot import invalid data', () => {
      cy.get('@importInput').type('Random data');
      cy.get('@importButton').should('be.disabled');
      boardObject().should('be.empty');
      cy.get('@importDialog').should('contain', 'Invalid data');
    });
    it('can import valid data', () => {
      cy.fixture('board.json').then(boardData => {
        cy.get('@importInput').typeJson(boardData);
        cy.get('@importButton').click();
        boardObject().should('deep.equal', boardData);
      });
    });
  });

  describe('Export Button', () => {
    it('can export board data', () => {});
    specify('Exportable data can be copied to clipboard', () => {});
  });

  describe('Export/Import scenario', () => {
    specify('User can export and then import board data', () => {});
  });
});
