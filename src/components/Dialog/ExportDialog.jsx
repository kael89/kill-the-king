import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../../propTypes';

const ExportDialog = ({ board, onClose, open }) => (
  <Dialog open={open}>
    <DialogTitle>Export</DialogTitle>
    <DialogContent>
      <DialogContentText>{JSON.stringify(board)}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

ExportDialog.propTypes = {
  board: propTypes.board.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ExportDialog;
