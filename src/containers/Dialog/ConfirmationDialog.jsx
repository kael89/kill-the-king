import { connect } from 'react-redux';

import ConfirmationDialog from '../../components/ConfirmationDialog';
import { hideDialog } from '../../store/modules/ui';
import Dialog from './Dialog';

const mapStateToProps = state => ({
  onConfirm: state.confirmationDialog.onConfirm,
});

const mapDispatchToProps = dispatch => ({
  onConfirm: callback => {
    if (callback) {
      callback();
    }
    dispatch(hideDialog());
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onConfirm: () => dispatchProps.onConfirm(stateProps.onConfirm),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Dialog(ConfirmationDialog));
