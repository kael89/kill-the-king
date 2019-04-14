import { connect } from 'react-redux';

import DraggablePiece from '../components/DraggablePiece';
import { MoveHelper } from '../helpers';
import { addPiece, movePiece, removePiece } from '../store/modules/board';

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

    const move = MoveHelper.toString({
      source: piece.position,
      target: dropData.position,
    });

    return dispatch(movePiece(move));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DraggablePiece);
