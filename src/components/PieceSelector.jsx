import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { PIECE_TYPE } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utilities/generic';
import DraggablePiece from './DraggablePiece';

const styles = {
  container: {
    display: 'inline-block',
  },
};

const PieceSelector = ({ classes, color, theme }) => (
  <Paper
    data-testid="piece-selector"
    data-color={color}
    elevation={1}
    className={classes.container}
  >
    {Object.values(PIECE_TYPE).map(type => (
      <DraggablePiece
        key={type}
        hoverColor={theme.piece.hovered}
        piece={{ color, type, position: '' }}
      />
    ))}
  </Paper>
);

PieceSelector.propTypes = {
  classes: propTypes.classes.isRequired,
  color: PropTypes.string.isRequired,
  theme: propTypes.theme.isRequired,
};

export default withThemeAndStyles(PieceSelector, styles);
