import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import html5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import ActionButton from '../containers/ActionButton';
import AvailableMoves from '../containers/AvailableMoves';
import Board from '../containers/Board';
import { ConfirmationDialog, ExportDialog, ImportDialog } from '../containers/Dialog';
import MoveHistory from '../containers/MoveHistory';
import Results from '../containers/Results';
import Settings from '../containers/Settings';
import ThemeProvider from '../containers/ThemeProvider';
import { Color, Dialog } from '../enums';
import propTypes from '../propTypes';
import store from '../store';
import { withThemeAndStyles } from '../utils';
import Header from './Header';
import PieceSelector from './PieceSelector';
import Toolbar from './Toolbar';

const styles = theme => ({
  container: {
    maxWidth: theme.breakpoints.values.lg,
    minWidth: theme.breakpoints.values.lg,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
  boardContainer: {
    marginBottom: theme.spacing.unit * 4,
  },
  exportDialog: {
    width: 400,
    maxHeight: 500,
  },
  pieceSelectorContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const App = ({ classes }) => (
  <Provider store={store}>
    <ThemeProvider>
      <DragDropContextProvider backend={html5Backend}>
        <CssBaseline />

        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} align="center" className={classes.pieceSelectorContainer}>
            <PieceSelector color={Color.BLACK} />
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={3}>
              <Toolbar />
            </Grid>
            <Grid item xs={6} container alignItems="stretch" direction="column">
              <Grid item container justify="center" className={classes.boardContainer}>
                <Board />
              </Grid>
            </Grid>
            <Grid item xs={3} container direction="column">
              <Results />
              <AvailableMoves />
              <MoveHistory />
            </Grid>
          </Grid>
          <Grid item xs={12} align="center" className={classes.pieceSelectorContainer}>
            <PieceSelector color={Color.WHITE} />
          </Grid>
          <Grid item xs={12}>
            <Settings />
          </Grid>
          <Grid item xs={12} align="center">
            <ActionButton />
          </Grid>
        </Grid>
      </DragDropContextProvider>
      <ConfirmationDialog id={Dialog.PIECE_CHANGE_CONFIRMATION} title="Warning">
        This will clear current results. Continue?
      </ConfirmationDialog>
      <ExportDialog id={Dialog.EXPORT} PaperProps={{ className: classes.exportDialog }} />
      <ImportDialog id={Dialog.IMPORT} />
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  classes: propTypes.classes.isRequired,
};

export default withThemeAndStyles(App, styles);
