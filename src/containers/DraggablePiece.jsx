import { connect } from 'react-redux';

import DraggablePiece from '../components/DraggablePiece';
import { MoveHelper } from '../helpers';
import { addPiece, movePiece, removePiece } from '../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onDrop: (piece, dropData) => {
    if (!dropData) {
      // Piece was not dropped in a valid location
      return null;
    }

    if (!dropData.position) {
      return dispatch(removePiece(piece.position));
    }
    if (!piece.position) {
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
