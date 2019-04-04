import React from 'react';
import { DropTarget } from 'react-dnd';

import Draggable from '../enums/Draggable';
import Square from './Square';

const squareTarget = {
  drop: ({ rowId, columnId }) => ({
    rowId,
    columnId,
  }),
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const DroppableSquare = ({ connectDropTarget, isOver, ...squareProps }) =>
  connectDropTarget(
    <div>
      <Square {...squareProps} />
    </div>,
  );

export default DropTarget(Draggable.PIECE, squareTarget, collect)(DroppableSquare);
