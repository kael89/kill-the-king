import { connect } from 'react-redux';

import { DIALOG_NAME } from '../../enums';
import { showDialog } from '../../store/ui/actions';
import ToolbarButton from './ToolbarButton';

const { IMPORT } = DIALOG_NAME;

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(IMPORT)),
});

export default connect(null, mapDispatchToProps)(ToolbarButton);
