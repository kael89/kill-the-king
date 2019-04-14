import { IconButton as IconButtonMui, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const IconButton = ({ icon, tooltip, ...otherProps }) => (
  <Tooltip title={tooltip} aria-label={tooltip} {...otherProps}>
    <IconButtonMui color="secondary">{icon}</IconButtonMui>
  </Tooltip>
);

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string,
};

IconButton.defaultProps = {
  tooltip: '',
};

export default IconButton;
