import { FormControlLabel, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { changeTheme } from '../store/ui/actions';
import themes, { THEME_NAME } from '../themes';

const { DARK, LIGHT } = THEME_NAME;

const ThemeSwitch = ({ onChange }) => (
  <FormControlLabel
    data-testid="theme-switch"
    onChange={onChange}
    control={<Switch />}
    label="Dark Theme"
  />
);

ThemeSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeTheme(e.target.checked ? themes[DARK] : themes[LIGHT])),
});

export default connect(
  null,
  mapDispatchToProps,
)(ThemeSwitch);
