import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import ConfirmationDialogContainer from '../containers/ConfirmationDialogContainer';

const ActionButton = ({ dialogOpen, onClick, onDialogConfirm }) => (
  <>
    <Button color="primary" onClick={onClick}>
      Go!
    </Button>
    <ConfirmationDialogContainer
      onConfirm={onDialogConfirm}
      open={dialogOpen}
      text="This will clear current results. Continue?"
      title="Warning"
    />
  </>
);

ActionButton.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDialogConfirm: PropTypes.func.isRequired,
};

export default ActionButton;
