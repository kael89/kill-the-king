import { idToSelector } from '.';

/**
 * Returns an element using its test id
 *
 * @param {string} idString One or more test ids, separated by spaces. If multiple ids are provided,
 * each id will correspond to a child element of the previous id
 * Example:
 * * 'idParent' => $('[data-testid="idParent"]')
 * * 'idParent idChild1' => $('[data-testid="idParent"] [data-testid="idChild1"]')
 * @returns {Chainable<JQuery<HTMLElementTagNameMap[K]>>}
 */
const getById = idString => cy.get(idToSelector(idString));
Cypress.Commands.add('getById', getById);

/**
 * Moves a piece across the board
 *
 * @param {string} [pieceSelector] If empty, the first draggable piece will be used
 * @param {string} [targetSquareSelector] If empty, the first droppable square will be used
 */
const movePiece = (pieceSelector = '', targetSquareSelector = '') => {
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
Cypress.Commands.add('movePiece', movePiece);

/**
 * @param {Chainable<Subject>} subject
 * @param {string|Object} json
 * @returns {Chainable<Subject>}
 */
const typeJson = (subject, json) => {
  const jsonText = Cypress._.isString(json) ? json : JSON.stringify(json);
  return cy.wrap(subject).type(jsonText.replace(/{/g, '{{}'));
};
Cypress.Commands.add('typeJson', { prevSubject: 'element' }, (subject, json) => typeJson(subject, json));
