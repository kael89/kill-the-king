import last from 'lodash/last';
import { connect } from 'react-redux';

import Board from '../components/Board';
import { addPiece, removePiece } from '../store/modules/board';

const mapStateToProps = state => ({
  board: last(state.board.history),
  hint: state.board.hint,
  showHint: state.ui.hintVisible,
});

const mapDispatchToProps = dispatch => ({
  addPiece: (type, color, position) => dispatch(addPiece({ type, color, position })),
  removePiece: position => dispatch(removePiece(position)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
