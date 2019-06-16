/**
 * Functions that select elements based on their attributes
 */

export const importDialog = () => cy.getByData({ testid: 'import-dialog' });

export const toolbarButton = text => cy.contains('[data-testid=toolbar-button]', new RegExp(text, 'i'));

export const square = (position = '') =>
  cy.getByData(Object.assign({ testid: 'square' }, position ? { position } : {}));
