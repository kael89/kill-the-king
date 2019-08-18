import {
  ExpansionPanel as ExpansionPanelMui,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';

import { PROP_TYPES } from '../propTypes';
import { withThemeAndStyles } from '../utilities/generic';

const styles = theme => ({
  summary: {
    fontWeight: theme.typography.fontWeightMedium,
  },
});

const ExpansionPanel = ({ children, classes, summary }) => (
  <ExpansionPanelMui defaultExpanded>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.summary}>{summary}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
  </ExpansionPanelMui>
);

ExpansionPanel.propTypes = {
  children: PROP_TYPES.children,
  classes: PROP_TYPES.classes.isRequired,
  summary: PropTypes.string,
};

ExpansionPanel.defaultProps = {
  children: null,
  summary: '',
};

export default withThemeAndStyles(ExpansionPanel, styles);
