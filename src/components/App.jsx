import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import html5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';

import ActionButtonContainer from '../containers/ActionButtonContainer';
import AvailableMovesContainer from '../containers/AvailableMovesContainer';
import BoardContainer from '../containers/BoardContainer';
import MoveHistoryContainer from '../containers/MoveHistoryContainer';
import ResultsContainer from '../containers/ResultsContainer';
import SettingsContainer from '../containers/SettingsContainer';
import ThemeProviderContainer from '../containers/ThemeProviderContainer';
import propTypes from '../propTypes';
import store from '../store';
import { withThemeAndStyles } from '../utils';
import Header from './Header';

const styles = theme => ({
  container: {
    maxWidth: theme.breakpoints.values.lg * 1,
    minWidth: theme.breakpoints.values.md,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
  boardContainer: {
    marginBottom: theme.spacing.unit * 4,
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
          <Grid item xs={8} lg={6} container alignItems="stretch" direction="column">
            <Grid item container justify="center" className={classes.boardContainer}>
              <BoardContainer />
            </Grid>
            <Grid item>
              <SettingsContainer />
            </Grid>
            <Grid item container justify="center">
              <ActionButtonContainer />
            </Grid>
          </Grid>
          <Grid item xs={4} lg={6} container direction="column">
            <ResultsContainer />
            <AvailableMovesContainer />
            <MoveHistoryContainer />
          </Grid>
        </Grid>
      </DragDropContextProvider>
    </ThemeProviderContainer>
  </Provider>
);

App.propTypes = {
  classes: propTypes.classes.isRequired,
};

export default withThemeAndStyles(App, styles);
