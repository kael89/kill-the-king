import React from 'react';
import { DropTarget } from 'react-dnd';

import { DRAGGABLE_TYPE } from '../enums';
import Square from './Square';

const squareTarget = {
  drop: ({ position }) => ({ position }),
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

export default DropTarget(DRAGGABLE_TYPE.PIECE, squareTarget, collect)(DroppableSquare);
