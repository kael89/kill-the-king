import React from 'react';
import { DragSource } from 'react-dnd';

import Draggable from '../enums/Draggable';
import Piece from './Piece';

const pieceSource = {
  beginDrag() {
    return {};
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const DraggablePiece = ({ connectDragSource, isDragging, ...pieceProps }) =>
  connectDragSource(
    <div>
      <Piece {...pieceProps} />
    </div>,
  );

export default DragSource(Draggable.PIECE, pieceSource, collect)(DraggablePiece);
