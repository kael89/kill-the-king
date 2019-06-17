import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../../propTypes';
import { printJson, withThemeAndStyles } from '../../utils';
import CodeBlock from '../CodeBlock';
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
});

const ExportDialog = ({ board, classes, onClose, ...otherProps }) => {
  const exportData = printJson(board);
  const { dispatch, ...dialogProps } = otherProps;

  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <DialogTitle>Export</DialogTitle>
      <DialogContent data-testid="export-dialog-content" className={classes.content}>
        <CopyToClipboardButton text={exportData} className={classes.copyIcon} />
        <CodeBlock code={exportData} language="json" />
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
