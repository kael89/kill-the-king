import last from 'lodash/last';
import { connect } from 'react-redux';

import Board from '../components/Board';

const mapStateToProps = state => ({
  board: last(state.board.history),
  hint: state.board.hint,
  showHint: state.ui.hintVisible,
});

export default connect(mapStateToProps)(Board);
