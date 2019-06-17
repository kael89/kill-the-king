/**
 * Functions that select elements based on their attributes
 */

export const exportDialog = () => cy.getByData({ testid: 'export-dialog' });

export const exportDialogContent = () => cy.getByData({ testid: 'export-dialog-content' });

export const exportDialogCopyButton = () => cy.getByData({ testid: 'export-dialog-copy-button' });

export const importDialog = () => cy.getByData({ testid: 'import-dialog' });

export const square = (position = '') =>
  cy.getByData(Object.assign({ testid: 'square' }, position ? { position } : {}));

export const toolbarButton = text => cy.contains('[data-testid=toolbar-button]', new RegExp(text, 'i'));