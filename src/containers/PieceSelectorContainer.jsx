import last from 'lodash/last';
import { connect } from 'react-redux';

import PieceSelector from '../components/PieceSelector';
import { addPiece, removePiece } from '../store/modules/board';
import { hidePieceSelector } from '../store/modules/ui';

const mapStateToProps = state => {
  const {
    ui: { pieceSelectorVisible, selectedPosition },
    board: { history },
  } = state;

  return {
    open: pieceSelectorVisible,
    selectedPiece: last(history)[selectedPosition] || null,
    selectedPosition,
  };
};

const mapDispatchToProps = dispatch => ({
  onConfirm: (type, color, position) => {
    dispatch(type && color ? addPiece(type, color, position) : removePiece(position));
    dispatch(hidePieceSelector());
  },
  onClose: () => dispatch(hidePieceSelector()),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onConfirm: (type, color) => dispatchProps.onConfirm(type, color, stateProps.selectedPosition),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PieceSelector);
