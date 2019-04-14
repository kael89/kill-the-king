import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { FileCopy as CopyIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../../propTypes';
import { printJson, withThemeAndStyles } from '../../utils';
import IconButton from '../IconButton';

const styles = theme => ({
  content: {
    position: 'relative',
  },
  copyIcon: {
    position: 'absolute',
    right: theme.spacing.unit * 2.5,
    top: theme.spacing.unit,
  },
  exportData: {
    background: theme.palette.grey[50],
    border: '1px solid black',
    padding: theme.spacing.unit * 2,
  },
});

const ExportDialog = ({ board, classes, onClose, open, ...dialogProps }) => (
  <Dialog onClose={onClose} open={open} {...dialogProps}>
    <DialogTitle>Export</DialogTitle>
    <DialogContent className={classes.content}>
      <IconButton className={classes.copyIcon} icon={<CopyIcon />} title="Copy to clipboard" />
      <pre className={classes.exportData}>{printJson(board)}</pre>
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
  classes: propTypes.classes.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withThemeAndStyles(ExportDialog, styles);
