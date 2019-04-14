import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { Dialog } from '../../enums';
import { showDialog } from '../../store/modules/ui';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(showDialog(Dialog.IMPORT)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
