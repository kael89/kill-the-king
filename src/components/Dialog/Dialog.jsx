import { connect } from 'react-redux';

import { hideDialog } from '../../store/ui/actions';

const mapStateToProps = (state, ownProps) => ({
  open: state.ui.visibleDialog === ownProps.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClose: () => {
    if (ownProps.onClose) {
      ownProps.onClose();
    }
    dispatch(hideDialog());
  },
});

export default DialogComponent => connect(mapStateToProps, mapDispatchToProps)(DialogComponent);
