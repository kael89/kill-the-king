import { connect } from 'react-redux';

import PieceSelector from '../components/PieceSelector';
import { addPiece, removePiece } from '../store/modules/board';
import { deselectPieceType, hidePieceSelector, selectPieceType, toggleColor } from '../store/modules/pieceSelector';

const mapStateToProps = state => {
  const {
    pieceSelector: { visible, piece },
  } = state;

  return {
    open: visible,
    piece,
    position: piece.position,
  };
};

const mapDispatchToProps = dispatch => ({
  addPiece: piece => dispatch(addPiece(piece)),
  deselectPieceType: () => dispatch(deselectPieceType()),
  onClose: () => dispatch(hidePieceSelector()),
  removePiece: piece => dispatch(removePiece(piece)),
  toggleColor: () => dispatch(toggleColor()),
  selectPieceType: type => dispatch(selectPieceType(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PieceSelector);
