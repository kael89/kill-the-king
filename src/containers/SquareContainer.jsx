import { connect } from 'react-redux';

import Square from '../components/Square';
import { showPieceSelector } from '../store/modules/ui';

const mapStateToProps = (state, ownProps) => {
  const {
    ui: { showHint, pieceSelector },
  } = state;

  return {
    hinted: showHint,
    open: pieceSelector.visible,
    selected: pieceSelector.squarePosition === ownProps.position,
  };
};

const mapDispatchToProps = dispatch => ({
  onClick: position => {
    dispatch(showPieceSelector({ selectedPosition: position }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);
