import last from 'lodash/last';
import { connect } from 'react-redux';

import ActionButton from '../components/ActionButton';
import { ApiHelper } from '../helpers';
import { setResetBoardId } from '../store/modules/board';
import { fetchForcedMateTree } from '../store/modules/results';
import { openDialog } from '../store/modules/ui';

const mapStateToProps = state => ({
  board: Object.values(last(state.board.history)),
  dialogOpen: state.ui.dialogOpen,
  startingColor: state.settings.startingColor,
  depth: ApiHelper.maxMovesToDepth(state.settings.maxMoves),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(openDialog());
  },
  onDialogConfirm: (board, startingColor, depth) => {
    dispatch(setResetBoardId());
    dispatch(fetchForcedMateTree(board, startingColor, depth));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  dialogOpen: stateProps.dialogOpen,
  ...dispatchProps,
  onDialogConfirm: () => dispatchProps.onDialogConfirm(stateProps.board, stateProps.startingColor, stateProps.depth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ActionButton);
