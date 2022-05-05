import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import propTypes from '../propTypes';
import { playMove, revertBoard } from '../store/board/actions';
import { clearMoveHistory } from '../store/moveHistory/actions';
import { getMoveDataForResetBoard } from '../store/selectors';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';
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
          return (
            <MoveButton
              key={move}
              onClick={() => onMoveSelect(moveDatum, boardId)}
              {...moveDatum}
            />
          );
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

const mapStateToProps = state => {
  const { resetBoardId } = state.board;
  const { data, loading, error } = state.results;

  return {
    error,
    loading,
    moveData: data && getMoveDataForResetBoard(state),
    resetBoardId,
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (resetBoardId, moveDatum) => {
    dispatch(clearMoveHistory());
    dispatch(revertBoard(resetBoardId));
    dispatch(playMove(moveDatum));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  onMoveSelect: moveDatum => dispatchProps.onMoveSelect(stateProps.resetBoardId, moveDatum),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Results);
