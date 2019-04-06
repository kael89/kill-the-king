import { connect } from 'react-redux';

import MoveHistory from '../components/MoveHistory';
import { NotationHelper } from '../helpers';
import { revertBoard } from '../store/modules/board';
import { restoreMove } from '../store/modules/moveHistory';

const createMoveData = (boardHistory, moveHistory) => {
  return moveHistory.map(moveData => {
    const { boardId, move } = moveData;
    const notation = NotationHelper.getNotation(boardHistory[boardId], move);

    return { ...moveData, notation };
  });
};

const mapStateToProps = state => ({
  moveData: createMoveData(state.board.history, state.moveHistory),
  startingColor: state.settings.startingColor,
});

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (index, boardId) => {
    dispatch(restoreMove(index));
    dispatch(revertBoard(boardId + 1));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoveHistory);
