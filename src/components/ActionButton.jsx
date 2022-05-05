import { Button } from '@material-ui/core';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { maxMovesToDepth } from '../api';
import { fetchForcedMateTree } from '../store/results/actions';

const ActionButton = ({ onClick }) => (
  <Button
    data-testid="action-button"
    color="primary"
    onClick={onClick}
    size="large"
    variant="contained"
  >
    Go!
  </Button>
);

ActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ActionButton);
