import { withStyles, withTheme } from '@material-ui/core';

const JSON_INDENTATION = 2;

/**
 * @param {string} json
 * @returns {boolean}
 */
export const isValidJson = json => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }

  return true;
};

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

export const withThemeAndStyles = (Component, styles = {}) => withTheme()(withStyles(styles)(Component));
