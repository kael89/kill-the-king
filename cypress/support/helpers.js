/**
 * @returns {Board}
 */
export const boardObject = () =>
  cy.getByData({ testId: 'square' }).then($squares => {
    const pairs = $squares
      .get()
      .filter(square => square.dataset.piece !== 'null')
      .map(square => [square.dataset.position, JSON.parse(square.dataset.piece)]);
    return Cypress._.fromPairs(pairs);
  });

/**
 * Moves a piece across the board
 *
 * @param {string} [pieceSelector] If empty, the first draggable piece will be used
 * @param {string} [targetSquareSelector] If empty, the first droppable square will be used
 */
export const movePiece = (pieceSelector = '', targetSquareSelector = '') => {
  cy.get(pieceSelector || '[data-testid=draggable-piece]')
    .first()
    .as('draggedPiece');
  cy.get(targetSquareSelector || '[data-testid=droppable-square]')
    .first()
    .as('dropSquare');

  cy.get('@draggedPiece').trigger('dragstart');
  cy.get('@dropSquare').trigger('drop');
  cy.get('@draggedPiece').trigger('dragend');
};

/**
 * @param {Piece} piece
//  */
export const addPiece = piece => {
  const { color } = piece;
  cy.getByData({ testid: 'piece-selector', color });
};
