import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import html5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import ActionButtonContainer from '../containers/ActionButtonContainer';
import AvailableMovesContainer from '../containers/AvailableMovesContainer';
import BoardContainer from '../containers/BoardContainer';
import MoveHistoryContainer from '../containers/MoveHistoryContainer';
import PieceChangeConfirmationDialog from '../containers/PieceChangeConfirmationDialog';
import ResultsContainer from '../containers/ResultsContainer';
import SettingsContainer from '../containers/SettingsContainer';
import ThemeProviderContainer from '../containers/ThemeProviderContainer';
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
  pieceSelectorContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const App = ({ classes }) => (
  <Provider store={store}>
    <ThemeProviderContainer>
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
                <BoardContainer />
              </Grid>
            </Grid>
            <Grid item xs={3} container direction="column">
              <ResultsContainer />
              <AvailableMovesContainer />
              <MoveHistoryContainer />
            </Grid>
          </Grid>
          <Grid item xs={12} align="center" className={classes.pieceSelectorContainer}>
            <PieceSelector color={Color.WHITE} />
          </Grid>
          <Grid item xs={12}>
            <SettingsContainer />
          </Grid>
          <Grid item xs={12} align="center">
            <ActionButtonContainer />
          </Grid>
        </Grid>
      </DragDropContextProvider>
      <PieceChangeConfirmationDialog id={Dialog.PIECE_CHANGE_CONFIRMATION} title="Warning">
        This will clear current results. Continue?
      </PieceChangeConfirmationDialog>
    </ThemeProviderContainer>
  </Provider>
);

App.propTypes = {
  classes: propTypes.classes.isRequired,
};

export default withThemeAndStyles(App, styles);
