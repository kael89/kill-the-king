import React from 'react';
import { DropTarget } from 'react-dnd';

import SquareContainer from '../containers/SquareContainer';
import Draggable from '../enums/Draggable';

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
      <SquareContainer {...squareProps} />
    </div>,
  );

export default DropTarget(Draggable.PIECE, squareTarget, collect)(DroppableSquare);
