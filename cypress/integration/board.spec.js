import { getBoardObject, pieceInBoard, pieceInSelector, setBoard, square, themeSwitch } from '../support';

/**
 * @param {Piece} piece
 */
const dragFromSelectorΤοBoard = piece => {
  const { color, type, position } = piece;
  square(position).as('_targetSquare');

  pieceInSelector(color, type).then($piece => cy.wrap($piece).dragAndDrop('@_targetSquare'));
};

const dragFromBoardToDestination = (position, destinationSelector) => {
  pieceInBoard(position).then($piece => cy.wrap($piece).dragAndDrop(destinationSelector));
};

context('Board', () => {
  const piece = { color: 'white', type: 'pawn', position: 'A1' };

  beforeEach(() => {
    cy.visit('/');
  });

  specify('user can add pieces in the board by dragging them from the selector', () => {
    dragFromSelectorΤοBoard({ color: 'white', type: 'pawn', position: 'A1' });
  });

  specify('user can replace pieces in the board by dragging new pieces from the selector', () => {
    const newPiece = { color: 'black', type: 'knight', position: 'A1' };

    setBoard({ A1: piece });
    dragFromSelectorΤοBoard({ color: 'black', type: 'knight', position: 'A1' });
    getBoardObject().should('deep.equal', { A1: newPiece });
  });

  specify('user can move pieces by dragging them across the board', () => {
    setBoard({ A1: piece });
    square('A2').as('squareA2');
    dragFromBoardToDestination('A1', '@squareA2');

    const newPiece = { ...piece, position: 'A2' };
    getBoardObject().should('deep.equal', { A2: newPiece });
  });

  specify.only('user can remove pieces by dragging them off the board', () => {
    themeSwitch().as('themeSwitch');
    setBoard({ A1: piece });
    dragFromBoardToDestination(piece.position, '@themeSwitch');

    getBoardObject().should('be.empty');
  });
});
