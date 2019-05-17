import { connect } from 'react-redux';

import MoveButton from '../components/MoveButton';
import { movePiece } from '../modules/board';
import { setHint } from '../store/modules/board';
import { hideBoardHint, showBoardHint } from '../store/modules/ui';

const mapStateToProps = (state, ownProps) => ({
  board: ownProps.boardId ? state.board.history[ownProps.boardId] : {},
});

const mapDispatchToProps = dispatch => ({
  onMouseOver: (board, move) => {
    if (!board || !move) {
      return;
    }

    const hint = movePiece(board, move);
    dispatch(setHint(hint));
    dispatch(showBoardHint());
  },
  onMouseOut: () => dispatch(hideBoardHint()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  boardId: ownProps.boardId,
  move: ownProps.move,
  notation: ownProps.notation,
  onMouseOver: () => {
    dispatchProps.onMouseOver(stateProps.board, ownProps.move);
  },
  onMouseOut: dispatchProps.onMouseOut,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(MoveButton);
