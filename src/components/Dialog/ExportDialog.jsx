import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../../propTypes';
import { printJson, withThemeAndStyles } from '../../utils';
import CopyToClipboardButton from '../CopyToClipboardButton';

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

const ExportDialog = ({ board, classes, onClose, open, PaperProps }) => {
  const exportData = printJson(board);

  return (
    <Dialog onClose={onClose} open={open} PaperProps={PaperProps}>
      <DialogTitle>Export</DialogTitle>
      <DialogContent className={classes.content}>
        <CopyToClipboardButton text={exportData} className={classes.copyIcon} />
        <pre className={classes.exportData}>{exportData}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ExportDialog.propTypes = {
  board: propTypes.board.isRequired,
  classes: propTypes.classes.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  PaperProps: PropTypes.objectOf(PropTypes.any),
};

ExportDialog.defaultProps = {
  PaperProps: {},
};

export default withThemeAndStyles(ExportDialog, styles);
