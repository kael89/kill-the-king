import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ToolbarButton = ({ icon, onClick, text }) => (
  <ListItem data-testid="toolbar-button" button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

ToolbarButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

ToolbarButton.defaultProps = {
  onClick: null,
};

export default ToolbarButton;
