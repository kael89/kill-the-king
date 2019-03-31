import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import MoveButtonContainer from '../containers/MoveButtonContainer';
import propTypes from '../propTypes';
import ExpansionPanel from './ExpansionPanel';

const AvailableMoves = ({ moveData, onMoveSelect }) => {
  let contents;

  if (moveData === null) {
    contents = '';
  } else if (moveData.length === 0) {
    contents = <Typography>Checkmate!</Typography>;
  } else {
    contents = moveData.map(moveDatum => {
      const { boardId, move } = moveDatum;
      return <MoveButtonContainer key={move} onClick={() => onMoveSelect(move, boardId)} {...moveDatum} />;
    });
  }

  return <ExpansionPanel summary="Available Moves">{contents}</ExpansionPanel>;
};

AvailableMoves.propTypes = {
  moveData: propTypes.moveData,
  onMoveSelect: PropTypes.func.isRequired,
};

AvailableMoves.defaultProps = {
  moveData: null,
};

export default AvailableMoves;
