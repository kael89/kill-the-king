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
  hinted: {
    color: theme.piece.hintColor,
  },
  hovered: {
    background: theme.piece.hovered,
  },
});

const Piece = ({ children, active, classes, hinted, hovered, theme, ...otherProps }) => (
  <Grid {...otherProps} className={classnames(classes.container, { active }, { hinted }, { hovered })}>
    {children}
  </Grid>
);

Piece.propTypes = {
  active: PropTypes.bool,
  children: propTypes.children,
  classes: propTypes.classes.isRequired,
  color: PropTypes.string,
  hinted: PropTypes.bool,
  hovered: PropTypes.bool,
  theme: propTypes.theme.isRequired,
};

Piece.defaultProps = {
  active: false,
  children: null,
  color: '',
  hinted: false,
  hovered: false,
};

export default withThemeAndStyles(Piece, styles);
