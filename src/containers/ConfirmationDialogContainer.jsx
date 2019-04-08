import { connect } from 'react-redux';

import ConfirmationDialog from '../components/ConfirmationDialog';
import { hideConfirmationDialog } from '../store/modules/ui';

const mapStateToProps = state => ({
  open: state.ui.dialogOpen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: () => {
    if (ownProps.onCancel) {
      ownProps.onCancel();
    }
    dispatch(hideConfirmationDialog());
  },
  onConfirm: () => {
    if (ownProps.onConfirm) {
      ownProps.onConfirm();
    }
    dispatch(hideConfirmationDialog());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog);
