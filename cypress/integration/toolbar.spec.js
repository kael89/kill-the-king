import { INITIAL_BOARD } from '../../src/modules/board';
import {
  addPiece,
  exportDialog,
  exportDialogContent,
  exportDialogCopyButton,
  getBoardObject,
  importDialog,
  setBoard,
  square,
  toolbarButton,
} from '../support';

context('Toolbar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('board.json').as('boardData');
  });

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
      cy.get('@boardData').then(boardData => {
        cy.get('@importInput').typeJson(boardData);
        cy.get('@importButton').click();
        getBoardObject().should('deep.equal', boardData);
      });
    });

    it('can cancel import', () => {
      cy.get('@boardData').then(boardData => {
        cy.get('@importInput').typeJson(boardData);
        cy.get('@importDialog')
          .contains('button', 'Cancel')
          .invoke('click');

        getBoardObject().should('be.empty');
      });
    });
  });

  describe('Export Button', () => {
    beforeEach(() => {
      cy.get('@boardData').then(setBoard);
      toolbarButton('Export').click();
    });

    it('can export board data', () => {
      cy.get('@boardData').then(boardData => {
        exportDialogContent()
          .invoke('text')
          .then(text => {
            cy.wrap(JSON.parse(text)).should('deep.equal', boardData);
          });
      });
    });

    specify('Exportable data can be copied to clipboard', () => {});
  });

  describe('Export/Import scenario', () => {
    specify('User can export and then import board data', () => {
      // Set board
      cy.get('@boardData').then(setBoard);

      // Export
      toolbarButton('Export').click();
      exportDialogCopyButton().click();
      exportDialog()
        .contains('button', 'OK')
        .click();

      // Clear board
      toolbarButton('Clear').click();

      // Import
      toolbarButton('Import').click();
      cy.get('@boardData').then(boardData => {
        importDialog()
          .find('textarea')
          .typeJson(boardData);
        importDialog()
          .contains('button', 'Import')
          .click();

        getBoardObject().should('deep.equal', boardData);
      });
    });
  });
});
