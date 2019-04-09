import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { MoveDataHelper } from '../helpers';
import { restoreMove } from '../store/modules/board';
import { addMove } from '../store/modules/moveHistory';

const mapStateToProps = state => {
  const {
    board: { history },
    moveHistory,
    results: { data },
  } = state;
  const chessTree = get(data, moveHistory.map(moveDatum => moveDatum.move), data);
  const boardId = history.length - 1;

  // console.info(data, data != {}, data !== {});
  return {
    checkmateFound: !isEmpty(data),
    moveData: MoveDataHelper.get(chessTree, history[boardId], boardId),
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: moveDatum => {
    dispatch(restoreMove(moveDatum.move));
    dispatch(addMove(moveDatum));
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMoveSelect: moveDatum => dispatchProps.onMoveSelect(moveDatum),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AvailableMoves);
