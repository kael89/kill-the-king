import { connect } from 'react-redux';

import { DIALOG } from '../../modules/ui';
import { showDialog } from '../../store/ui/actions';
import ToolbarButton from './ToolbarButton';

const { IMPORT } = DIALOG;

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(IMPORT)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
