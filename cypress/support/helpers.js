/**
 * @param {string} idString
 * @returns {string}
 */
export const idToSelector = idString =>
  idString
    .split(' ')
    .map(testId => `[data-testid="${testId}"]`)
    .join(' ');

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
