import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import propTypes from '../propTypes';

const ThemeProvider = ({ children, theme }) => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>{children}</MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: propTypes.children.isRequired,
  theme: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
};

const mapStateToProps = state => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(ThemeProvider);
