import { square } from './elements';

/**
 * @param {string} requestSelector
 * @param {string} paramName
 * @param {string} paramValue
 */
export const assertQueryParam = (requestSelector, paramName, paramValue) => {
  cy.wait(requestSelector).then(({ url }) => {
    const queryParams = new URLSearchParams(url);
    cy.wrap(queryParams.get(paramName)).should('equal', paramValue);
  });
};

/**
 *
 * @param {string} text
 * @returns {string}
 */
export const camelToKebabCase = text => Cypress._.snakeCase(text).replace('_', '-');

/**
 * @returns {Board}
 */
export const getBoardObject = () =>
  cy.getByData({ testId: 'square' }).then($squares => {
    const pairs = $squares
      .get()
      .filter($square => $square.dataset.piece !== 'null')
      .map($square => [$square.dataset.position, JSON.parse($square.dataset.piece)]);
    return Cypress._.fromPairs(pairs);
  });

/**
 * @param {Piece} piece
 */
export const addPiece = piece => {
  const { color, type, position } = piece;
  square(position).as('targetSquare');

  cy.getByData({ testid: 'piece-selector' }, { testid: 'piece', color, type }).then($piece =>
    cy.wrap($piece).dragAndDrop('@targetSquare'),
  );
};

/**
 * @param {Board} boardObject
 */
export const setBoard = boardObject => {
  Object.values(boardObject).forEach(piece => addPiece(piece));
};
