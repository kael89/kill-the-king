import { List } from '@material-ui/core';
import {
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  VerticalAlignTop as VerticalAlignTopIcon,
} from '@material-ui/icons';
import React from 'react';

import { ImportDialog } from '../containers/Dialog';
import { ClearButton, DefaultBoardButton, ImportButton } from '../containers/ToolbarButton';
import { Dialog } from '../enums';
import ToolbarButton from './ToolbarButton';

const Toolbar = () => (
  <>
    <List>
      <ClearButton text="Clear" icon={<ClearIcon />} />
      <DefaultBoardButton text="Default board" icon={<RefreshIcon />} />
      <ImportButton text="Import" icon={<VerticalAlignTopIcon />} />
      <ToolbarButton text="Export" icon={<VerticalAlignBottomIcon />} />
    </List>
    <ImportDialog id={Dialog.IMPORT} />
  </>
);

export default Toolbar;
