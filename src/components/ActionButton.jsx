import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ActionButton = ({ onClick }) => (
  <>
    <Button data-testid="action-button" color="primary" onClick={onClick} size="large" variant="contained">
      Go!
    </Button>
  </>
);

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
