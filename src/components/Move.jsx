import { Typography } from '@material-ui/core';
import React from 'react';

import { PROP_TYPES } from '../propTypes';
import { withThemeAndStyles } from '../utilities/generic';

const styles = {
  icon: {
    fontSize: '1.25rem',
  },
};

const Move = ({ classes, notation }) => (
  <Typography>
    <span className={classes.icon}>{notation.pieceCode}</span>
    {notation.text}
    {notation.promotionCode ? <span className={classes.icon}>{notation.promotionCode}</span> : null}
  </Typography>
);

Move.propTypes = {
  classes: PROP_TYPES.classes.isRequired,
  notation: PROP_TYPES.notation.isRequired,
};

export default withThemeAndStyles(Move, styles);
