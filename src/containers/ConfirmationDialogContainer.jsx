import { connect } from 'react-redux';

import ConfirmationDialog from '../components/ConfirmationDialog';
import { closeDialog } from '../store/modules/ui';

const mapStateToProps = state => ({
  open: state.ui.dialogOpen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: () => {
    if (ownProps.onCancel) {
      ownProps.onCancel();
    }
    dispatch(closeDialog());
  },
  onConfirm: () => {
    if (ownProps.onConfirm) {
      ownProps.onConfirm();
    }
    dispatch(closeDialog());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog);
