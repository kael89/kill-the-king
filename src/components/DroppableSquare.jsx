import React from 'react';
import { DropTarget } from 'react-dnd';

import Square from '../containers/Square';
import { DRAGGABLE } from '../modules/ui';

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
    <div data-testid="droppable-square">
      <Square {...squareProps} />
    </div>,
  );

export default DropTarget(PIECE, squareTarget, collect)(DroppableSquare);
