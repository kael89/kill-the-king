import {
  Button,
  Dialog as DialogMaterial,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { hideDialog } from '../../store/ui/actions';
import Dialog from './Dialog';

const ConfirmationDialog = ({ children, onClose, onConfirm, open, title }) => (
  <DialogMaterial open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        OK
      </Button>
    </DialogActions>
  </DialogMaterial>
);

ConfirmationDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

ConfirmationDialog.defaultProps = {
  children: null,
  title: '',
};

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
