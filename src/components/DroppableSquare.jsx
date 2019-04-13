import React from 'react';
import { DropTarget } from 'react-dnd';

import Square from '../containers/Square';
import Draggable from '../enums/Draggable';

const squareTarget = {
  drop: position => position,
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const DroppableSquare = ({ connectDropTarget, isOver, position, ...squareProps }) =>
  connectDropTarget(
    <div>
      <Square {...squareProps} />
    </div>,
  );

export default DropTarget(Draggable.PIECE, squareTarget, collect)(DroppableSquare);
