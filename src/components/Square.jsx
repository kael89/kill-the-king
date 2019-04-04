import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Color } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';
import DraggablePiece from './DraggablePiece';
import { DropTarget } from 'react-dnd';
import Draggable from '../enums/Draggable';

export const SQUARE_SIZE = 70;

const getSquareColor = (rowId, columnId) => ((rowId + columnId) % 2 === 0 ? Color.BLACK : Color.WHITE);

const styles = theme => ({
  container: {
    width: `${SQUARE_SIZE}px`,
    height: `${SQUARE_SIZE}px`,
  },
  black: {
    background: theme.chessColor.black,
  },
  white: {
    background: theme.chessColor.white,
  },
  selected: {
    border: `5px solid ${theme.square.selected}`,
  },
});

class Square extends React.Component {
  shouldComponentUpdate(nextProps) {
    const updatableProps = ['pieceCode', 'pieceColor', 'selected', 'theme'];

    for (let i = 0; i < updatableProps.length; i++) {
      const prop = updatableProps[i];
      if (this.props[prop] !== nextProps[prop]) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { classes, rowId, columnId, pieceCode, pieceColor, selected, ...otherProps } = this.props;

    const colorClass = getSquareColor(rowId, columnId) === Color.BLACK ? 'black' : 'white';

    return (
      <Grid {...otherProps} className={classnames(classes.container, classes[colorClass], { selected })}>
        <DraggablePiece color={pieceColor}>{pieceCode}</DraggablePiece>
      </Grid>
    );
  }
}

Square.propTypes = {
  classes: propTypes.classes.isRequired,
  pieceCode: PropTypes.string.isRequired,
  pieceColor: PropTypes.string,
  rowId: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  theme: propTypes.theme.isRequired,
};

Square.defaultProps = {
  pieceColor: '',
  selected: false,
};

export default withThemeAndStyles(Square, styles);
