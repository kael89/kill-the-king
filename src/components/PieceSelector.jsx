import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import DraggablePieceContainer from '../containers/DraggablePieceContainer';
import { PieceType } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const styles = {
  container: {
    display: 'inline-block',
  },
};

const PieceSelector = ({ classes, color, theme }) => (
  <Paper elevation={1} className={classes.container}>
    {PieceType.allByPower.map(type => (
      <DraggablePieceContainer key={type} hoverColor={theme.piece.hovered} piece={{ color, type, position: '' }} />
    ))}
  </Paper>
);

PieceSelector.propTypes = {
  classes: propTypes.classes.isRequired,
  color: PropTypes.string.isRequired,
  theme: propTypes.theme.isRequired,
};

export default withThemeAndStyles(PieceSelector, styles);
