import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PieceCodes } from '../constants';
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

const Piece = ({ children, classes, hinted, hovered, piece, theme, ...otherProps }) => (
  <Grid
    {...otherProps}
    className={classnames(classes.container, {
      [classes.hinted]: hinted,
      [classes.hovered]: hovered,
    })}
  >
    {PieceCodes[piece.color][piece.type]}
  </Grid>
);

Piece.propTypes = {
  children: propTypes.children,
  classes: propTypes.classes.isRequired,
  hinted: PropTypes.bool,
  hovered: PropTypes.bool,
  piece: propTypes.piece.isRequired,
  theme: propTypes.theme.isRequired,
};

Piece.defaultProps = {
  children: null,
  hinted: false,
  hovered: false,
};

export default withThemeAndStyles(Piece, styles);
