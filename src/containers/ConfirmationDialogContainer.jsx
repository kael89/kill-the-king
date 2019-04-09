import { connect } from 'react-redux';

import ConfirmationDialog from '../components/ConfirmationDialog';
import { hideConfirmationDialog } from '../store/modules/ui';

const mapStateToProps = state => {
  const { onCancel, onConfirm, text, title, visible } = state.ui.confirmationDialog;

  return {
    onConfirm,
    onCancel,
    open: visible,
    title,
    text,
  };
};

const mapDispatchToProps = dispatch => ({
  onCancel: callback => {
    if (callback) {
      callback();
    }
    dispatch(hideConfirmationDialog());
  },
  onConfirm: callback => {
    if (callback) {
      callback();
    }
    dispatch(hideConfirmationDialog());
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onCancel: () => dispatchProps.onCancel(stateProps.onCancel),
  onConfirm: () => dispatchProps.onConfirm(stateProps.onConfirm),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmationDialog);
