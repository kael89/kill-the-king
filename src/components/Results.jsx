import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import MoveButton from '../containers/MoveButton';
import propTypes from '../propTypes';
import ExpansionPanel from './ExpansionPanel';
import Spinner from './Spinner';

const Results = ({ error, onMoveSelect, moveData, loading }) => {
  let contents;
  if (error.length > 0) {
    contents = <p>Error: {error}</p>;
  } else if (loading) {
    contents = <Spinner />;
  } else if (moveData === null) {
    contents = <Typography>Click &quot;Go&quot; to find forced checkmates</Typography>;
  } else if (moveData.length === 0) {
    contents = <Typography>No checkmates found. Try changing the board or settings</Typography>;
  } else {
    contents = (
      <div style={{ width: '100%' }}>
        <Typography>
          {moveData.length} checkmate{moveData.length > 1 ? 's' : ''} found:
        </Typography>

        {moveData.map(moveDatum => {
          const { boardId, move } = moveDatum;
          return <MoveButton key={move} onClick={() => onMoveSelect(moveDatum, boardId)} {...moveDatum} />;
        })}
      </div>
    );
  }

  return (
    <ExpansionPanel summary="Results">
      <div data-testid="results">{contents}</div>
    </ExpansionPanel>
  );
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
