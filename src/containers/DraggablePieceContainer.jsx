import { connect } from 'react-redux';

import DraggablePiece from '../components/DraggablePiece';
import { MoveHelper } from '../helpers';
import { movePiece } from '../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onDrop: (startPosition, endPosition) => {
    const move = MoveHelper.toString({
      source: startPosition,
      target: endPosition,
    });
    dispatch(movePiece(move));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DraggablePiece);
