import { INITIAL_BOARD } from '../../src/modules/board';
import { addPiece, getBoardObject, importDialog, square, toolbarButton } from '../support';

beforeEach(() => {
  cy.visit('/');
});

context('Toolbar', () => {
  describe('Clear Button', () => {
    beforeEach(() => {
      toolbarButton('Clear').as('clearButton');
    });

    it('can clear the board', () => {
      addPiece({ type: 'pawn', color: 'black', position: 'B7' });
      cy.get('@clearButton').invoke('click');
      square()
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
      getBoardObject().should('deep.equal', INITIAL_BOARD);
    });
    it('can set a filled board to its default state', () => {
      addPiece({ type: 'pawn', color: 'black', position: 'B7' });
      cy.get('@defaultBoardButton').invoke('click');
      getBoardObject().should('deep.equal', INITIAL_BOARD);
    });
  });

  describe('Import Button', () => {
    beforeEach(() => {
      toolbarButton('Import').click();

      importDialog().as('importDialog');
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
      getBoardObject().should('be.empty');
    });
    it('cannot import invalid data', () => {
      cy.get('@importInput').type('Random data');
      cy.get('@importButton').should('be.disabled');
      getBoardObject().should('be.empty');
      cy.get('@importDialog').should('contain', 'Invalid data');
    });
    it('can import valid data', () => {
      cy.fixture('board.json').then(boardData => {
        cy.get('@importInput').typeJson(boardData);
        cy.get('@importButton').click();
        getBoardObject().should('deep.equal', boardData);
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
