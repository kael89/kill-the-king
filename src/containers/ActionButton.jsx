import last from 'lodash/last';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { maxMovesToDepth } from '../modules/api';
import { fetchForcedMateTree } from '../store/results/actions';

const mapStateToProps = state => ({
  board: Object.values(last(state.board.history)),
  startingColor: state.settings.startingColor,
  depth: maxMovesToDepth(state.settings.maxMoves),
});

const mapDispatchToProps = dispatch => ({
  onClick: (board, startingColor, depth) => {
    dispatch(fetchForcedMateTree(board, startingColor, depth));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  dialogOpen: stateProps.dialogOpen,
  onClick: () =>
    dispatchProps.onClick(stateProps.board, stateProps.startingColor, stateProps.depth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ActionButton);
