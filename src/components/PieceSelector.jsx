import PropTypes from 'prop-types';
import React from 'react';

import DraggablePieceContainer from '../containers/DraggablePieceContainer';
import { PieceType } from '../enums';
import { withThemeAndStyles } from '../utils';

const PieceSelector = ({ color, theme }) =>
  PieceType.allByPower.map(type => (
    <DraggablePieceContainer key={type} hoverColor={theme.piece.hovered} piece={{ color, type, position: '' }} />
  ));

PieceSelector.propTypes = {
  color: PropTypes.string.isRequired,
};

export default withThemeAndStyles(PieceSelector, {});
