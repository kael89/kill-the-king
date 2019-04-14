import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ImportDialog = ({ onClose, onImport, open }) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>Import</DialogTitle>
    <DialogContent>
      <TextField id="import" label="Paste your board data here" variant="filled" />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onImport} color="primary">
        Import
      </Button>
    </DialogActions>
  </Dialog>
);

ImportDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ImportDialog;
