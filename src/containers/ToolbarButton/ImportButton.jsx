import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { DIALOG } from '../../modules/ui';
import { showDialog } from '../../store/ui/actions';

const { IMPORT } = DIALOG;

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(IMPORT)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
