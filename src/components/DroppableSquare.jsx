import React from 'react';
import { DropTarget } from 'react-dnd';

import { DRAGGABLE } from '../modules/ui';
import Square from './Square';

const { PIECE } = DRAGGABLE;

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

export default DropTarget(PIECE, squareTarget, collect)(DroppableSquare);
