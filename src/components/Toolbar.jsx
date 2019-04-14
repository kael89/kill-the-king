import { List } from '@material-ui/core';
import {
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
  VerticalAlignTop as VerticalAlignTopIcon,
} from '@material-ui/icons';
import React from 'react';

import { ExportDialog, ImportDialog } from '../containers/Dialog';
import { ClearButton, DefaultBoardButton, ExportButton, ImportButton } from '../containers/ToolbarButton';
import { Dialog } from '../enums';

const Toolbar = () => (
  <>
    <List>
      <ClearButton text="Clear" icon={<ClearIcon />} />
      <DefaultBoardButton text="Default board" icon={<RefreshIcon />} />
      <ImportButton text="Import" icon={<VerticalAlignTopIcon />} />
      <ExportButton text="Export" icon={<VerticalAlignBottomIcon />} />
    </List>
    <ExportDialog id={Dialog.EXPORT} />
    <ImportDialog id={Dialog.IMPORT} />
  </>
);

export default Toolbar;
