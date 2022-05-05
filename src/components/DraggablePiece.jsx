import React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import { DRAGGABLE_TYPE } from '../enums';
import { addPiece, movePiece, removePiece } from '../store/board/actions';
import { withThemeAndStyles } from '../utilities/generic';
import { moveToString } from '../utilities/move';
import Piece from './Piece';

const pieceSource = {
  beginDrag: ({ piece }) => piece,
  endDrag: ({ piece, onDrop }, monitor) => onDrop(piece, monitor.getDropResult()),
};

const collect = (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
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

const mapDispatchToProps = dispatch => ({
  onDrop: (piece, dropData) => {
    if (dropData === undefined) {
      // Invalid drag and drop operation
      return null;
    }

    if (dropData === null) {
      // Piece was dropped outside the board
      return dispatch(removePiece(piece.position));
    }
    if (!piece.position) {
      // Piece was dragging from outside the board
      return dispatch(addPiece({ ...piece, position: dropData.position }));
    }

    const move = moveToString({
      source: piece.position,
      target: dropData.position,
    });

    return dispatch(movePiece(move));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(
  DragSource(
    DRAGGABLE_TYPE.PIECE,
    pieceSource,
    collect,
  )(withThemeAndStyles(DraggablePiece, styles)),
);
