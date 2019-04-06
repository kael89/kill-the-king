import { connect } from 'react-redux';

import MoveHistory from '../components/MoveHistory';
import { revertBoard } from '../store/modules/board';
import { restoreMove } from '../store/modules/moveHistory';

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
