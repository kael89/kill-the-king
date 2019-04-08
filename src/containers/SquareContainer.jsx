import { connect } from 'react-redux';

import Square from '../components/Square';
import { showPieceSelector } from '../store/modules/pieceSelector';

const mapStateToProps = (state, ownProps) => {
  const {
    pieceSelector,
    ui: { showHint },
  } = state;

  return {
    hinted: showHint,
    selected: pieceSelector.piece.position === ownProps.position,
  };
};

const mapDispatchToProps = dispatch => ({
  onClick: piece => {
    dispatch(showPieceSelector(piece));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);
