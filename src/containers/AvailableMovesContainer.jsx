import { get } from 'lodash';
import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { NotationHelper } from '../helpers';
import { movePiece } from '../store/modules/board';
import { addMove } from '../store/modules/moveHistory';

const extractAvailableMovesData = (data, moveHistory, board, boardId) => {
  if (data === null) {
    return null;
  }

  const availableMoves = Object.keys(get(data, moveHistory.map(moveData => moveData.move), data));

  return availableMoves.map(move => ({
    boardId,
    move,
    notation: NotationHelper.getNotation(board, move),
  }));
};

const mapStateToProps = state => {
  const boardId = state.board.history.length - 1;
  const board = state.board.history[boardId];

  return {
    moveData: extractAvailableMovesData(state.results.data, state.moveHistory, board, boardId),
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
