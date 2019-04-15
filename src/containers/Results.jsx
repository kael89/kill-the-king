import { connect } from 'react-redux';

import Results from '../components/Results';
import { MoveDataHelper } from '../helpers';
import { playMove, revertBoard } from '../store/modules/board';
import { clearMoveHistory } from '../store/modules/moveHistory';

const mapStateToProps = state => {
  const { history, resetBoardId } = state.board;
  const { data, loading, error } = state.results;

  return {
    error,
    loading,
    moveData: data !== null ? MoveDataHelper.get(data, history[resetBoardId], resetBoardId) : null,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Results);
