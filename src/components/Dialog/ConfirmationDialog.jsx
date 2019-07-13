import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ConfirmationDialog = ({ children, onClose, onConfirm, open, title }) => (
  <Dialog open={open}>
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
  </Dialog>
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

export default ConfirmationDialog;
