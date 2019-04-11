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
    color: theme.piece.color,
  },
  hinted: {
    color: theme.piece.hinted,
  },
  hovered: {
    background: theme.piece.hovered,
  },
});

const Piece = ({ children, classes, hinted, hovered, theme, ...otherProps }) => (
  <Grid
    {...otherProps}
    className={classnames(classes.container, {
      [classes.hinted]: hinted,
      [classes.hovered]: hovered,
    })}
  >
    {children}
  </Grid>
);

Piece.propTypes = {
  children: propTypes.children,
  classes: propTypes.classes.isRequired,
  color: PropTypes.string,
  hinted: PropTypes.bool,
  hovered: PropTypes.bool,
  theme: propTypes.theme.isRequired,
};

Piece.defaultProps = {
  children: null,
  color: '',
  hinted: false,
  hovered: false,
};

export default withThemeAndStyles(Piece, styles);
