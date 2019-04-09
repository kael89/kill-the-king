import { get } from 'lodash';
import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { MoveDataHelper, MoveHelper } from '../helpers';
import { movePiece } from '../store/modules/board';
import { addMove } from '../store/modules/moveHistory';

const mapStateToProps = state => {
  const {
    board: { history },
    moveHistory,
    results: { data },
  } = state;
  const chessTree = get(data, moveHistory.map(moveDatum => moveDatum.move), data);
  const boardId = history.length - 1;

  return {
    moveData: MoveDataHelper.get(chessTree, history[boardId], boardId),
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (board, moveDatum) => {
    const { source, target } = MoveHelper.parse(board, moveDatum.move);

    dispatch(movePiece(source, target));
    dispatch(addMove(moveDatum));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMoveSelect: moveDatum => dispatchProps.onMoveSelect(stateProps.board, moveDatum),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AvailableMoves);
