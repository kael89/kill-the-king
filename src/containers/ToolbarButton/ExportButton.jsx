import { last } from 'lodash';
import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { Dialog } from '../../enums';
import { showDialog } from '../../store/modules/ui';

const mapStateToProps = state => ({
  board: last(state.board.history),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(Dialog.EXPORT)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolbarButton);
