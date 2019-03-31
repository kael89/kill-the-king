import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const styles = theme => ({
  container: {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '3rem',
  },
  active: {
    background: theme.piece.active,
  },
  hovered: {
    background: theme.piece.hovered,
  },
});

const Piece = ({ children, active, classes, color, hovered, theme, ...otherProps }) => (
  <Grid
    className={classnames(classes.container, { [classes.active]: active }, { [classes.hovered]: hovered })}
    style={{ color: color.length > 0 ? color : theme.piece.color }}
    {...otherProps}
  >
    {children}
  </Grid>
);

Piece.propTypes = {
  active: PropTypes.bool,
  children: propTypes.children,
  classes: propTypes.classes.isRequired,
  color: PropTypes.string,
  hovered: PropTypes.bool,
  theme: propTypes.theme.isRequired,
};

Piece.defaultProps = {
  active: false,
  children: null,
  color: '',
  hovered: false,
};

export default withThemeAndStyles(Piece, styles);
