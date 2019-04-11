import { connect } from 'react-redux';

import DraggablePiece from '../components/DraggablePiece';
import { MoveHelper } from '../helpers';
import { addPiece, movePiece, removePiece } from '../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onDrop: (piece, target) => {
    if (!target) {
      return dispatch(removePiece(piece.position));
    }
    if (!piece.position) {
      return dispatch(addPiece({ ...piece, position: target }));
    }

    const move = MoveHelper.toString({
      source: piece.position,
      target,
    });
    return dispatch(movePiece(move));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DraggablePiece);
