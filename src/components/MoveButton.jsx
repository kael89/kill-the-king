import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';
import Move from './Move';

const styles = {
  moveButton: {
    textTransform: 'none',
  },
};

const MoveButton = ({ classes, onClick, onMouseOver, onMouseOut, ...moveProps }) => (
  <Button
    className={classes.moveButton}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onFocus={onMouseOver}
    onMouseOut={onMouseOut}
    onBlur={onMouseOut}
  >
    <Move {...moveProps} />
  </Button>
);

MoveButton.propTypes = {
  classes: propTypes.classes.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
};

MoveButton.defaultProps = {
  onMouseOver: null,
  onMouseOut: null,
};

export default withThemeAndStyles(MoveButton, styles);
