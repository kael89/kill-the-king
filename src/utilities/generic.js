import { withStyles, withTheme } from '@material-ui/core';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const JSON_INDENTATION = 2;

/**
 * @param {any} value
 * @returns {boolean}
 */
export const isHashObject = value =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * @param {any} input
 * @returns {string}
 */
export const prettifyJson = input => {
  const processedInput = isHashObject(input) ? sortObjectKeys(input) : input;
  return JSON.stringify(processedInput, null, JSON_INDENTATION);
};

const sortObjectKeys = object =>
  Object.keys(object)
    .sort()
    .reduce((result, key) => ({ ...result, [key]: object[key] }), {});

export const showError = error => {
  // eslint-disable-next-line no-alert
  alert(error);
};

export const withThemeAndStyles = (Component, styles = {}) =>
  withTheme()(withStyles(styles)(Component));

export const withDragDropContext = DragDropContext(HTML5Backend);
