import { withStyles, withTheme } from '@material-ui/core';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const JSON_INDENTATION = 2;

/**
 * @param {string} json
 * @returns {string}
 */
export const printJson = json => JSON.stringify(json, null, JSON_INDENTATION);

/**
 * @param {string} error
 */
export const showError = error => {
  // eslint-disable-next-line no-alert
  alert(error);
};

export const withThemeAndStyles = (Component, styles = {}) =>
  withTheme()(withStyles(styles)(Component));

export const withDragDropContext = DragDropContext(HTML5Backend);
