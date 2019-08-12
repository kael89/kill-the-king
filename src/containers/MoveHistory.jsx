import { connect } from 'react-redux';

import MoveHistory from '../components/MoveHistory';
import { revertBoard } from '../store/board/actions';
import { restoreMove } from '../store/moveHistory/actions';

const mapStateToProps = state => ({
  moveData: state.moveHistory,
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
