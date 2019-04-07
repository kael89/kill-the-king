import { connect } from 'react-redux';

import Square from '../components/Square';
import { showPieceSelector } from '../store/modules/ui';

const mapStateToProps = (state, ownProps) => ({
  hinted: state.ui.showHint,
  selected: state.ui.selectedPosition === ownProps.position,
});

const mapDispatchToProps = dispatch => ({
  onClick: position => {
    dispatch(showPieceSelector(position));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square);
