import { CssBaseline, Grid } from '@material-ui/core';
import classnames from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';

import ActionButton from '../containers/ActionButton';
import AvailableMoves from '../containers/AvailableMoves';
import Board from '../containers/Board';
import { ConfirmationDialog, ExportDialog, ImportDialog } from '../containers/Dialog';
import MoveHistory from '../containers/MoveHistory';
import Results from '../containers/Results';
import Settings from '../containers/Settings';
import ThemeProvider from '../containers/ThemeProvider';
import { COLOR } from '../modules/chess';
import { DIALOG } from '../modules/ui';
import propTypes from '../propTypes';
import store from '../store';
import { withDragDropContext, withThemeAndStyles } from '../utils';
import Header from './Header';
import PieceSelector from './PieceSelector';
import SocialLinks from './SocialLinks';
import Toolbar from './Toolbar';

const { BLACK, WHITE } = COLOR;
const { EXPORT, IMPORT, PIECE_CHANGE_CONFIRMATION } = DIALOG;

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
  dialog: {
    width: 400,
    maxHeight: 500,
  },
  importDialog: {
    height: 500,
  },
  pieceSelectorContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const App = ({ classes }) => (
  <Provider store={store}>
    <ThemeProvider>
      <CssBaseline />

      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} align="center" className={classes.pieceSelectorContainer}>
          <PieceSelector color={BLACK} />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3}>
            <Toolbar />
          </Grid>
          <Grid item xs={6} container alignItems="center" direction="column">
            <Grid item className={classes.boardContainer}>
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
          <PieceSelector color={WHITE} />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Settings />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Grid item xs={12} container align="center">
          <Grid item xs={3} />
          <Grid item xs={6}>
            <ActionButton />
          </Grid>
          <Grid item xs={3} align="right">
            <SocialLinks />
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationDialog id={PIECE_CHANGE_CONFIRMATION} title="Warning">
        This will clear current results. Continue?
      </ConfirmationDialog>
      <ExportDialog id={EXPORT} PaperProps={{ className: classes.dialog }} />
      <ImportDialog
        id={IMPORT}
        PaperProps={{ className: classnames(classes.dialog, classes.importDialog) }}
      />
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  classes: propTypes.classes.isRequired,
};

export default withDragDropContext(withThemeAndStyles(App, styles));
