import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import MoveButtonContainer from '../containers/MoveButtonContainer';
import propTypes from '../propTypes';
import ExpansionPanel from './ExpansionPanel';

const AvailableMoves = ({ checkmateFound, moveData, onMoveSelect }) => {
  let contents;

  if (moveData === null) {
    contents = '';
  } else if (checkmateFound && moveData.length === 0) {
    contents = <Typography>Checkmate!</Typography>;
  } else {
    contents = moveData.map(moveDatum => {
      return <MoveButtonContainer key={moveDatum.move} onClick={() => onMoveSelect(moveDatum)} {...moveDatum} />;
    });
  }

  return <ExpansionPanel summary="Available Moves">{contents}</ExpansionPanel>;
};

AvailableMoves.propTypes = {
  checkmateFound: PropTypes.bool.isRequired,
  moveData: propTypes.moveData,
  onMoveSelect: PropTypes.func.isRequired,
};

AvailableMoves.defaultProps = {
  moveData: null,
};

export default AvailableMoves;
