import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel, open, text, title }) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};

ConfirmationDialog.defaultProps = {
  title: '',
};

export default ConfirmationDialog;
