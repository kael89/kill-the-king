import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ImportDialog = ({ onCancel, onImport, open }) => (
  <Dialog open={open}>
    <DialogTitle>Import</DialogTitle>
    <DialogContent />
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onImport} color="primary">
        Import
      </Button>
    </DialogActions>
  </Dialog>
);

ImportDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ImportDialog;
