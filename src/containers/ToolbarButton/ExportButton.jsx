import { last } from 'lodash';
import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { DIALOG } from '../../modules/ui';
import { showDialog } from '../../store/modules/ui';

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
