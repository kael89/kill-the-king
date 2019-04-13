import { List } from '@material-ui/core';
import {
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  VerticalAlignTop as VerticalAlignTopIcon,
} from '@material-ui/icons';
import React from 'react';

import ClearButtonContainer from '../containers/ToolbarButton/ClearButtonContainer';
import ToolbarButton from './ToolbarButton';

const Toolbar = () => (
  <List>
    <ClearButtonContainer text="Clear" icon={<ClearIcon />} />
    <ToolbarButton text="Initial setup" icon={<RefreshIcon />} />
    <ToolbarButton text="Import" icon={<VerticalAlignTopIcon />} />
    <ToolbarButton text="Export" icon={<VerticalAlignBottomIcon />} />
  </List>
);

export default Toolbar;
