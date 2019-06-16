const getDataSelector = data =>
  Object.entries(data)
    .map(([key, value]) => `[data-${key}="${value}"]`)
    .join('');

/**
 * @param {string} id
 * @param {Object} data
 * @returns {string}
 */
export const idToSelector = (id, data = {}) => getDataSelector({ testid: id, ...data });

/**
 * @returns {Board}
 */
export const boardObject = () =>
  cy.getById('square').then($squares => {
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
  cy.get(pieceSelector || idToSelector('draggable-piece'))
    .first()
    .as('draggedPiece');
  cy.get(targetSquareSelector || idToSelector('droppable-square'))
    .first()
    .as('dropSquare');

  cy.get('@draggedPiece').trigger('dragstart');
  cy.get('@dropSquare').trigger('drop');
  cy.get('@draggedPiece').trigger('dragend');
};

/**
 * @param {Piece} piece
 */
// export const addPiece = piece => {
//   cy.getById(`${idToSelector('piece-selector')} `).
// };
