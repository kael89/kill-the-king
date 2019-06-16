/**
 * @param {Object} data
 * @returns {string}
 */
export const dataToSelector = data =>
  Object.entries(data)
    .map(([key, value]) => `[data-${key}=${value}]`)
    .join('');

/**
 * Returns an element using its test id and (optionally) additional data attributes
 *
 * @param {string} id
 * @param {Object} [data={}]
 * @returns {Chainable<JQuery<HTMLElementTagNameMap[K]>>}
 */
const getByData = (data = {}) => cy.get(dataToSelector(data));
Cypress.Commands.add('getByData', getByData);

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
