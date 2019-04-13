import { connect } from 'react-redux';

import ConfirmationDialog from '../components/ConfirmationDialog';
import { hideDialog } from '../store/modules/ui';

const mapStateToProps = (state, ownProps) => ({
  open: state.ui.visibleDialog === ownProps.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: () => {
    if (ownProps.onCancel) {
      ownProps.onCancel();
    }
    dispatch(hideDialog());
  },
  onConfirm: () => {
    if (ownProps.onConfirm) {
      ownProps.onConfirm();
    }
    dispatch(hideDialog());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog);
