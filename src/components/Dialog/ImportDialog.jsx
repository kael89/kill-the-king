import {
  Button,
  Dialog as DialogMui,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { importBoard } from '../../store/board/actions';
import { hideDialog } from '../../store/ui/actions';
import { validateBoardJson } from '../../utilities/validateBoardJson';
import CodeInput from '../CodeInput';
import Dialog from './Dialog';

class ImportDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      input: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleInputChange(input) {
    let errorMessage = '';
    if (input.trim()) {
      try {
        validateBoardJson(input.trim());
      } catch (error) {
        errorMessage = error.message;
      }
    }

    this.setState({
      error: errorMessage,
      input,
    });
  }

  handleClose() {
    const { onClose } = this.props;

    this.setState({
      error: '',
      input: '',
    });
    onClose();
  }

  handleImport() {
    const { input } = this.state;
    const { onImport } = this.props;

    onImport(input);
    this.handleClose();
  }

  render() {
    const { error, input } = this.state;
    const { onImport, ...otherProps } = this.props;
    const hasError = !!error;
    const hasInput = !!input.trim();

    return (
      <DialogMui {...otherProps} data-testid="import-dialog" onClose={this.handleClose}>
        <DialogTitle>Import</DialogTitle>
        <DialogContent>
          <DialogContentText>Paste your data here:</DialogContentText>
          <CodeInput
            code={input}
            error={hasError}
            label={error}
            onChange={e => this.handleInputChange(e.target.value)}
            rows={16}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={hasError || !hasInput} onClick={this.handleImport} color="primary">
            Import
          </Button>
        </DialogActions>
      </DialogMui>
    );
  }
}

ImportDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

ImportDialog.defaultProps = {
  open: false,
};

const mapDispatchToProps = dispatch => ({
  onImport: boardJson => {
    dispatch(importBoard(boardJson));
    dispatch(hideDialog());
  },
});

export default connect(null, mapDispatchToProps)(Dialog(ImportDialog));
