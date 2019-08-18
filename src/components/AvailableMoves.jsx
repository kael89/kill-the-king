import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { PROP_TYPES } from '../propTypes';
import { playMove } from '../store/board/actions';
import { isCheckmateFound } from '../store/results/selectors';
import { getRenderMovesForCurrentBoard } from '../store/selectors';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';

const AvailableMoves = ({ checkmateFound, renderMoves, onMoveSelect }) => {
  let contents;

  if (renderMoves === null) {
    contents = '';
  } else if (checkmateFound && renderMoves.length === 0) {
    contents = <Typography>Checkmate!</Typography>;
  } else {
    contents = renderMoves.map(renderMove => {
      return (
        <MoveButton
          key={renderMove.move}
          onClick={() => onMoveSelect(renderMove)}
          {...renderMove}
        />
      );
    });
  }

  return <ExpansionPanel summary="Available Moves">{contents}</ExpansionPanel>;
};

AvailableMoves.propTypes = {
  checkmateFound: PropTypes.bool.isRequired,
  renderMoves: PROP_TYPES.renderMoves,
  onMoveSelect: PropTypes.func.isRequired,
};

AvailableMoves.defaultProps = {
  renderMoves: null,
};

const mapStateToProps = state => ({
  checkmateFound: isCheckmateFound(state),
  renderMoves: getRenderMovesForCurrentBoard(state),
});

const mapDispatchToProps = dispatch => ({
  onMoveSelect: renderMove => dispatch(playMove(renderMove)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onMoveSelect: renderMove => dispatchProps.onMoveSelect(renderMove),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AvailableMoves);
