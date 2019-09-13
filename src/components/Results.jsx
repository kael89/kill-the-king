import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { PROP_TYPES } from '../propTypes';
import { playMove, revertBoard } from '../store/board/actions';
import { clearMoveHistory } from '../store/moveHistory/actions';
import { getRenderMovesForResetBoard } from '../store/selectors';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';
import Spinner from './Spinner';

const Results = ({ error, onMoveSelect, renderMoves, loading }) => {
  let contents;
  if (error.length > 0) {
    contents = <p>Error: {error}</p>;
  } else if (loading) {
    contents = <Spinner />;
  } else if (renderMoves === null) {
    contents = <Typography>Click &quot;Go&quot; to find forced checkmates</Typography>;
  } else if (renderMoves.length === 0) {
    contents = <Typography>No checkmates found. Try changing the board or settings</Typography>;
  } else {
    contents = (
      <div style={{ width: '100%' }}>
        <Typography>
          {renderMoves.length} checkmate{renderMoves.length > 1 ? 's' : ''} found:
        </Typography>

        {renderMoves.map(renderMove => {
          const { boardId, move } = renderMove;
          return (
            <MoveButton
              key={move}
              onClick={() => onMoveSelect(renderMove, boardId)}
              {...renderMove}
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
  renderMoves: PROP_TYPES.renderMoves,
  onMoveSelect: PropTypes.func.isRequired,
};

Results.defaultProps = {
  error: '',
  loading: false,
  renderMoves: null,
};

const mapStateToProps = state => {
  const { resetBoardId } = state.board;
  const { data, loading, error } = state.results;

  return {
    error,
    loading,
    renderMoves: data && getRenderMovesForResetBoard(state),
    resetBoardId,
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (resetBoardId, renderMove) => {
    dispatch(clearMoveHistory());
    dispatch(revertBoard(resetBoardId));
    dispatch(playMove(renderMove));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  onMoveSelect: renderMove => dispatchProps.onMoveSelect(stateProps.resetBoardId, renderMove),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Results);
