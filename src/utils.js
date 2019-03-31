import { withStyles, withTheme } from '@material-ui/core';

/**
 * @param {string} error
 */
export const showError = error => {
  // eslint-disable-next-line no-alert
  alert(error);
};

export const withThemeAndStyles = (Component, styles = {}) => withTheme()(withStyles(styles)(Component));
