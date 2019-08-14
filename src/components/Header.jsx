import { Typography } from '@material-ui/core';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utilities/generic';
import ThemeSwitch from './ThemeSwitch';

const styles = theme => ({
  container: {
    position: 'relative',
  },
  themeSwitch: {
    position: 'absolute',
    bottom: -1 * theme.spacing.unit * 2,
    right: 0,
  },
});

const Header = ({ classes }) => (
  <div className={classes.container}>
    <Typography align="center" variant="h4" gutterBottom>
      Chasemate
    </Typography>
    <div className={classes.themeSwitch}>
      <ThemeSwitch />
    </div>
  </div>
);

Header.propTypes = {
  classes: propTypes.classes.isRequired,
};

export default withThemeAndStyles(Header, styles);
