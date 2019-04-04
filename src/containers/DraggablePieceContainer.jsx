import { connect } from 'react-redux';

import DraggablePiece from '../components/DraggablePiece';
import { MoveHelper } from '../helpers';
import { movePiece, removePiece } from '../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onDrop: (startPosition, endPosition) => {
    if (endPosition === null) {
      return dispatch(removePiece(startPosition));
    }

    const move = MoveHelper.toString({
      source: startPosition,
      target: endPosition,
    });
    return dispatch(movePiece(move));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DraggablePiece);
