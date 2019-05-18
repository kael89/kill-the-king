import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { COLOR } from '../modules/chess';
import { SETTING_KEY } from '../modules/settings';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const { BLACK, WHITE } = COLOR;

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
  },
  moveDepthInput: {
    minWidth: 100,
  },
});

const Settings = ({ classes, settings, setSetting }) => (
  <Grid container justify="space-around" className={classes.container}>
    <Grid item>
      <FormControlLabel
        checked={settings[SETTING_KEY.STARTING_COLOR] === WHITE}
        control={<Switch />}
        label={settings[SETTING_KEY.STARTING_COLOR] === WHITE ? 'White plays first' : 'Black plays first'}
        onChange={e => setSetting(SETTING_KEY.STARTING_COLOR, e.target.checked ? WHITE : BLACK)}
        value={settings[SETTING_KEY.STARTING_COLOR]}
      />
    </Grid>
    <Grid item>
      <FormControl className={classes.moveDepthInput}>
        <InputLabel htmlFor="settings-moveDepth">Move depth</InputLabel>
        <Select
          inputProps={{
            id: 'settings-moveDepth',
            name: 'moveDepth',
          }}
          value={settings[SETTING_KEY.MAX_MOVES]}
          onChange={e => setSetting(SETTING_KEY.MAX_MOVES, parseInt(e.target.value, 10))}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

Settings.propTypes = {
  classes: propTypes.classes.isRequired,
  settings: propTypes.settings.isRequired,
  setSetting: PropTypes.func.isRequired,
};

export default withThemeAndStyles(Settings, styles);
