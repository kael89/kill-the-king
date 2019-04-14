import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../../propTypes';
import { printJson } from '../../utils';

const ExportDialog = ({ board, onClose, open, ...dialogProps }) => (
  <Dialog onClose={onClose} open={open} {...dialogProps}>
    <DialogTitle>Export</DialogTitle>
    <DialogContent>
      <pre>{printJson(board)}</pre>
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
