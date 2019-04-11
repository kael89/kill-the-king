import { Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import DraggablePieceContainer from '../containers/DraggablePieceContainer';
import { PieceType } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const PieceSelector = ({ color, theme }) => (
  <Paper elevation={1}>
    <Grid container direction="row">
      {PieceType.allByPower.map(type => (
        <DraggablePieceContainer key={type} hoverColor={theme.piece.hovered} piece={{ color, type, position: '' }} />
      ))}
    </Grid>
  </Paper>
);

PieceSelector.propTypes = {
  color: PropTypes.string.isRequired,
  theme: propTypes.theme.isRequired,
};

export default withThemeAndStyles(PieceSelector, {});
