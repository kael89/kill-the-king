import React from 'react';
import { DragSource } from 'react-dnd';

import { DRAGGABLE } from '../modules/ui';
import { withThemeAndStyles } from '../utils';
import Piece from './Piece';

const { PIECE } = DRAGGABLE;

const pieceSource = {
  beginDrag: ({ piece }) => piece,
  endDrag: ({ piece, onDrop }, monitor) => onDrop(piece, monitor.getDropResult()),
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const styles = {
  pieceContainer: {
    display: 'inline-block',
  },
};

const DraggablePiece = ({ classes, connectDragSource, isDragging, piece, ...otherProps }) =>
  connectDragSource(
    <div className={classes.pieceContainer}>
      <Piece piece={piece} {...otherProps} />
    </div>,
  );

export default DragSource(PIECE, pieceSource, collect)(withThemeAndStyles(DraggablePiece, styles));
