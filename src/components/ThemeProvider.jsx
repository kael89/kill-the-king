import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../propTypes';

const ThemeProvider = ({ children, theme }) => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>{children}</MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: propTypes.children.isRequired,
  theme: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
};

export default ThemeProvider;
