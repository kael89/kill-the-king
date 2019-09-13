import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { COLOR } from '../enums';
import { PROP_TYPES } from '../propTypes';
import { setSetting as setSettingAction } from '../store/settings/actions';
import { withThemeAndStyles } from '../utilities/generic';

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
        data-testid="settings-starting-color"
        checked={settings.startingColor === WHITE}
        control={<Switch />}
        label={settings.startingColor === WHITE ? 'White plays first' : 'Black plays first'}
        onChange={e => setSetting('startingColor', e.target.checked ? WHITE : BLACK)}
        value={settings.startingColor}
      />
    </Grid>
    <Grid item>
      <FormControl data-testid="settings-move-depth" className={classes.moveDepthInput}>
        <InputLabel htmlFor="settings-moveDepth">Move depth</InputLabel>
        <Select
          inputProps={{
            id: 'settings-moveDepth',
            name: 'moveDepth',
          }}
          value={settings.maxMoves}
          onChange={e => setSetting('maxMoves', parseInt(e.target.value))}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
);

Settings.propTypes = {
  classes: PROP_TYPES.classes.isRequired,
  settings: PROP_TYPES.settings.isRequired,
  setSetting: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setSetting: (name, value) => dispatch(setSettingAction({ [name]: value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeAndStyles(Settings, styles));
