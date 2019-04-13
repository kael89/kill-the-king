import last from 'lodash/last';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { ApiHelper } from '../helpers';
import { fetchForcedMateTree } from '../store/modules/results';

const mapStateToProps = state => ({
  board: Object.values(last(state.board.history)),
  startingColor: state.settings.startingColor,
  depth: ApiHelper.maxMovesToDepth(state.settings.maxMoves),
});

const mapDispatchToProps = dispatch => ({
  onClick: (board, startingColor, depth) => {
    dispatch(fetchForcedMateTree(board, startingColor, depth));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  dialogOpen: stateProps.dialogOpen,
  onClick: () => dispatchProps.onClick(stateProps.board, stateProps.startingColor, stateProps.depth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ActionButton);
