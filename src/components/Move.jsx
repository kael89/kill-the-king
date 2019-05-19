import { Typography } from '@material-ui/core';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

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
  classes: propTypes.classes.isRequired,
  notation: propTypes.notation.isRequired,
};

export default withThemeAndStyles(Move, styles);
