import { get } from 'lodash';
import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { MoveDataHelper } from '../helpers';
import { movePiece } from '../store/modules/board';
import { addMove } from '../store/modules/moveHistory';

const mapStateToProps = state => {
  const {
    board: { history },
    moveHistory,
    results: { data },
  } = state;
  const chessTree = get(data, moveHistory.map(moveData => moveData.move), data);
  const boardId = history.length - 1;

  return {
    boardId,
    moveData: MoveDataHelper.get(chessTree, history[boardId], boardId),
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
