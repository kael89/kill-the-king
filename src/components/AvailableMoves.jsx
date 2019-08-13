import { Typography } from '@material-ui/core';
import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getMoveData } from '../modules/moveData';
import propTypes from '../propTypes';
import { playMove } from '../store/board/actions';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';

const AvailableMoves = ({ checkmateFound, moveData, onMoveSelect }) => {
  let contents;

  if (moveData === null) {
    contents = '';
  } else if (checkmateFound && moveData.length === 0) {
    contents = <Typography>Checkmate!</Typography>;
  } else {
    contents = moveData.map(moveDatum => {
      return (
        <MoveButton key={moveDatum.move} onClick={() => onMoveSelect(moveDatum)} {...moveDatum} />
      );
    });
  }

  return <ExpansionPanel summary="Available Moves">{contents}</ExpansionPanel>;
};

AvailableMoves.propTypes = {
  checkmateFound: PropTypes.bool.isRequired,
  moveData: propTypes.moveData,
  onMoveSelect: PropTypes.func.isRequired,
};

AvailableMoves.defaultProps = {
  moveData: null,
};

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
