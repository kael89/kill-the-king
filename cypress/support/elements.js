/**
 * Functions that select elements based on their attributes
 */
import { camelToKebabCase } from './helpers';

export const actionButton = () => cy.getByData({ testid: 'action-button' });

export const exportDialog = () => cy.getByData({ testid: 'export-dialog' });

export const exportDialogContent = () => cy.getByData({ testid: 'export-dialog-content' });

export const exportDialogCopyButton = () => cy.getByData({ testid: 'export-dialog-copy-button' });

export const importDialog = () => cy.getByData({ testid: 'import-dialog' });

export const pieceInBoard = position => cy.getByData({ testid: 'square', position }, { testid: 'piece' });

export const pieceInSelector = (color, type) =>
  cy.getByData({ testid: 'piece-selector' }, { testid: 'piece', color, type });

export const results = () => cy.getByData({ testid: 'results' });

export const setting = name => cy.getByData({ testid: `settings-${camelToKebabCase(name)}` });

export const square = (position = '') =>
  cy.getByData(Object.assign({ testid: 'square' }, position ? { position } : {}));

export const themeSwitch = () => cy.getByData({ testid: 'theme-switch' });

export const toolbarButton = text => cy.contains('[data-testid=toolbar-button]', new RegExp(text, 'i'));
