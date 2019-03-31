import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { SettingKey } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

// const MAX_MOVE_LIMIT = 2; // TODO enforce

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
  },
});

const Settings = ({ classes, settings, setSetting }) => (
  <Grid container justify="space-around" className={classes.container}>
    <Grid item>
      <FormLabel>Who plays first?</FormLabel>
      <RadioGroup
        row
        value={settings[SettingKey.STARTING_COLOR]}
        onChange={e => setSetting(SettingKey.STARTING_COLOR, e.target.value, 10)}
      >
        <FormControlLabel value="black" control={<Radio />} label="Black" />
        <FormControlLabel value="white" control={<Radio />} label="White" />
      </RadioGroup>
    </Grid>
    <Grid item>
      <FormControl>
        <InputLabel>Move depth</InputLabel>
        <Input
          type="number"
          value={settings[SettingKey.MAX_MOVES]}
          onChange={e => setSetting(SettingKey.MAX_MOVES, parseInt(e.target.value, 10))}
        />
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
