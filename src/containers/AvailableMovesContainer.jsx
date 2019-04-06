import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { MoveDataHelper } from '../helpers';
import { movePiece } from '../store/modules/board';
import { addMove } from '../store/modules/moveHistory';

const mapStateToProps = state => {
  const boardId = state.board.history.length - 1;
  const board = state.board.history[boardId];

  return {
    moveData: MoveDataHelper.get(state.results.data, state.moveHistory, board, boardId),
    board,
    boardId,
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (move, boardId) => {
    dispatch(movePiece(move));
    dispatch(addMove(move, boardId));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  moveData: stateProps.moveData,
  board: stateProps.board,
  onMoveSelect: move => dispatchProps.onMoveSelect(move, stateProps.boardId),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AvailableMoves);
