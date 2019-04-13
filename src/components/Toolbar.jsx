import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  VerticalAlignTop as VerticalAlignTopIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const ToolbarButton = ({ icon, text }) => (
  <ListItem button>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

ToolbarButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

const Toolbar = () => (
  <List>
    <ToolbarButton text="Clear" icon={<ClearIcon />} />
    <ToolbarButton text="Initial setup" icon={<RefreshIcon />} />
    <ToolbarButton text="Import" icon={<VerticalAlignTopIcon />} />
    <ToolbarButton text="Export" icon={<VerticalAlignBottomIcon />} />
  </List>
);

export default Toolbar;
