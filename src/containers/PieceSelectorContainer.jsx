import last from 'lodash/last';
import { connect } from 'react-redux';

import PieceSelector from '../components/PieceSelector';
import { addPiece, removePiece } from '../store/modules/board';
import { hidePieceSelector } from '../store/modules/ui';

const mapStateToProps = state => {
  const {
    ui: {
      pieceSelector: { visible, selectedPosition },
    },
    board: { history },
  } = state;

  return {
    open: visible,
    selectedPiece: last(history)[selectedPosition] || null,
    selectedPosition,
  };
};

const mapDispatchToProps = dispatch => ({
  addPiece: (type, color, position) => dispatch(addPiece(type, color, position)),
  onCancel: () => dispatch(hidePieceSelector()),
  removePiece: position => dispatch(removePiece(position)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  addPiece: ({ type, color }) => dispatchProps.addPiece(type, color, stateProps.selectedPosition),
  removePiece: () => dispatchProps.removePiece(stateProps.selectedPosition),
  onConfirm: ({ type, color }) => dispatchProps.onConfirm(type, color, stateProps.selectedPosition),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PieceSelector);
