import { last } from 'lodash';
import { connect } from 'react-redux';

import { DIALOG } from '../../modules/ui';
import { showDialog } from '../../store/ui/actions';
import ToolbarButton from './ToolbarButton';

const { EXPORT } = DIALOG;

const mapStateToProps = state => ({
  board: last(state.board.history),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(EXPORT)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolbarButton);
