import {
  CLEAR_RESULTS,
  INVALIDATE_FORCED_MATE_TREE,
  RECEIVE_FORCED_MATE_TREE,
  REQUEST_FORCED_MATE_TREE,
} from './actions';

const defaultResults = {
  data: null,
  loading: false,
  error: '',
};

export default (results = defaultResults, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return defaultResults;
    case REQUEST_FORCED_MATE_TREE:
      return { ...results, loading: true };
    case RECEIVE_FORCED_MATE_TREE:
      return { ...results, data: action.data, loading: false };
    case INVALIDATE_FORCED_MATE_TREE:
      return { ...results, error: action.error, loading: false };
    default:
      return results;
  }
};
