import { getForcedMateTree } from '../../modules/api';
import { showError } from '../../utils';
import { setResetBoardId } from '../board/actions';
import { clearMoveHistory } from '../moveHistory/actions';

export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const REQUEST_FORCED_MATE_TREE = 'REQUEST_FORCED_MATE_TREE';
export const RECEIVE_FORCED_MATE_TREE = 'RECEIVE_FORCED_MATE_TREE';
export const INVALIDATE_FORCED_MATE_TREE = 'INVALIDATE_FORCED_MATE_TREE';

export const clearResults = () => dispatch => {
  dispatch(clearMoveHistory());
  dispatch({
    type: CLEAR_RESULTS,
  });
};

const requestForcedMateTree = () => ({
  type: REQUEST_FORCED_MATE_TREE,
});

const receiveForcedMateTree = data => ({
  data,
  type: RECEIVE_FORCED_MATE_TREE,
});

const invalidateForcedMateTree = error => ({
  error,
  type: INVALIDATE_FORCED_MATE_TREE,
});

export const fetchForcedMateTree = (board, startingColor, depth) => async dispatch => {
  dispatch(clearResults());
  dispatch(setResetBoardId());
  dispatch(requestForcedMateTree());

  try {
    const response = await getForcedMateTree({ board, startingColor, depth });
    const { data, error } = await response.json();

    if (error.length > 0) {
      dispatch(invalidateForcedMateTree(error));
    } else {
      dispatch(receiveForcedMateTree(data));
    }
  } catch (e) {
    showError(e);
  }
};
