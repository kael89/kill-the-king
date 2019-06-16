/**
 * Transforms a key/value map of HTML data attributes to a CSS selector.
 * Example:
 * `{ testid: 'square', piece: '!null'}` => `[data-testid=square:not(data-piece=null)]`
 *
 * @param {Object.<string, string>} data An object of `{ key: value }` pairs.
 * Available `value` modifiers:
 * * '!': the selected element will not have `value` for `data-${key}`
 * @returns {string}
 */
const dataToSelector = data => {
  const dataTransformers = {
    '!': ({ key, value }) => `:not([data-${key}=${value.substring(1)}])`,
  };
  const defaultTransformer = ({ key, value }) => `[data-${key}=${value}]`;

  const getDataTransformer = value => {
    const modifier = value.charAt(0);
    return dataTransformers[modifier] || defaultTransformer;
  };

  return Object.entries(data)
    .map(([key, value]) => getDataTransformer(value)({ key, value }))
    .join('');
};

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
