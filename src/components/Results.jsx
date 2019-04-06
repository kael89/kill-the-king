import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import MoveButtonContainer from '../containers/MoveButtonContainer';
import propTypes from '../propTypes';
import ExpansionPanel from './ExpansionPanel';
import Spinner from './Spinner';

const Results = ({ error, onMoveSelect, moveData, loading }) => {
  let contents;
  if (error.length > 0) {
    // TODO format here
    contents = <p>Error: {error}</p>;
  } else if (loading) {
    contents = <Spinner />;
  } else {
    contents =
      moveData === null ? (
        <Typography>Click &quot;Go&quot; to detect forced checkmates</Typography>
      ) : (
        moveData.map(moveDatum => {
          const { boardId, move } = moveDatum;
          return <MoveButtonContainer key={move} onClick={() => onMoveSelect(move, boardId)} {...moveDatum} />;
        })
      );
  }

  return <ExpansionPanel summary="Results">{contents}</ExpansionPanel>;
};

Results.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  moveData: propTypes.moveData,
  onMoveSelect: PropTypes.func.isRequired,
};

Results.defaultProps = {
  error: '',
  loading: false,
  moveData: null,
};

export default Results;
