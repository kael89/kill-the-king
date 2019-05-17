import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import AvailableMoves from '../components/AvailableMoves';
import { getMoveData } from '../modules/moveData';
import { playMove } from '../store/modules/board';

const mapStateToProps = state => {
  const {
    board: { history },
    moveHistory,
    results: { data },
  } = state;
  const chessTree = get(data, moveHistory.map(moveDatum => moveDatum.move), data);
  const boardId = history.length - 1;

  return {
    checkmateFound: !isEmpty(data),
    moveData: getMoveData(chessTree, history[boardId], boardId),
  };
};

const mapDispatchToProps = dispatch => ({
  onMoveSelect: moveDatum => dispatch(playMove(moveDatum)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onMoveSelect: moveDatum => dispatchProps.onMoveSelect(moveDatum),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AvailableMoves);
