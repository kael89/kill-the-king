import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const styles = {
  icon: {
    fontSize: '1.25rem',
  },
};

const Move = ({ classes, notation }) => (
  <>
    <span className={classes.icon}>{notation.code}</span>
    {notation.text}
  </>
);

Move.propTypes = {
  classes: propTypes.classes.isRequired,
  notation: propTypes.notation.isRequired,
};

export default withThemeAndStyles(Move, styles);
