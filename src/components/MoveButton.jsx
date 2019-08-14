import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import propTypes from '../propTypes';
import { setHint } from '../store/board/actions';
import { movePiece } from '../store/board/reducer';
import { hideBoardHint, showBoardHint } from '../store/ui/actions';
import { withThemeAndStyles } from '../utilities/generic';
import Move from './Move';

const styles = {
  moveButton: {
    textTransform: 'none',
  },
};

const MoveButton = ({ classes, onClick, onMouseOver, onMouseOut, ...moveProps }) => (
  <Button
    className={classes.moveButton}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onFocus={onMouseOver}
    onMouseOut={onMouseOut}
    onBlur={onMouseOut}
  >
    <Move {...moveProps} />
  </Button>
);

MoveButton.propTypes = {
  classes: propTypes.classes.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
};

MoveButton.defaultProps = {
  onMouseOver: null,
  onMouseOut: null,
};

const mapStateToProps = (state, ownProps) => ({
  board: ownProps.boardId ? state.board.history[ownProps.boardId] : {},
});

const mapDispatchToProps = dispatch => ({
  onMouseOver: (board, move) => {
    if (!board || !move) {
      return;
    }

    const hint = movePiece(board, move);
    dispatch(setHint(hint));
    dispatch(showBoardHint());
  },
  onMouseOut: () => dispatch(hideBoardHint()),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  boardId: ownProps.boardId,
  move: ownProps.move,
  notation: ownProps.notation,
  onMouseOver: () => {
    dispatchProps.onMouseOver(stateProps.board, ownProps.move);
  },
  onMouseOut: dispatchProps.onMouseOut,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(withThemeAndStyles(MoveButton, styles));
