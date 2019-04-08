import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ActionButton = ({ onClick }) => (
  <>
    <Button color="primary" onClick={onClick}>
      Go!
    </Button>
  </>
);

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
