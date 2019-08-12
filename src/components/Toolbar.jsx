import { List } from '@material-ui/core';
import {
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  VerticalAlignTop as VerticalAlignTopIcon,
} from '@material-ui/icons';
import React from 'react';

import { ClearButton, DefaultBoardButton, ExportButton, ImportButton } from './ToolbarButton';

const Toolbar = () => (
  <>
    <List>
      <ClearButton text="Clear" icon={<ClearIcon />} />
      <DefaultBoardButton text="Default board" icon={<RefreshIcon />} />
      <ImportButton text="Import" icon={<VerticalAlignTopIcon />} />
      <ExportButton text="Export" icon={<VerticalAlignBottomIcon />} />
    </List>
  </>
);

export default Toolbar;
