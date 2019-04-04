import React from 'react';
import { DragSource } from 'react-dnd';

import Draggable from '../enums/Draggable';
import { PositionHelper } from '../helpers';
import Piece from './Piece';

const pieceSource = {
  beginDrag: ({ rowId, columnId }) => ({ rowId, columnId }),
  endDrag: ({ rowId, columnId, onDrop }, monitor) => {
    const dropResult = monitor.getDropResult();
    const startPosition = PositionHelper.getPositionName(rowId, columnId);
    const endPosition = dropResult ? PositionHelper.getPositionName(dropResult.rowId, dropResult.columnId) : null;

    onDrop(startPosition, endPosition);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const DraggablePiece = ({ connectDragSource, isDragging, rowId, columnId, ...pieceProps }) =>
  connectDragSource(
    <div>
      <Piece {...pieceProps} />
    </div>,
  );

export default DragSource(Draggable.PIECE, pieceSource, collect)(DraggablePiece);
