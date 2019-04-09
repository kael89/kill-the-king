import { connect } from 'react-redux';

import Results from '../components/Results';
import { MoveDataHelper } from '../helpers';

const mapStateToProps = state => {
  const { history, resetBoardId } = state.board;
  const { data, loading, error } = state.results;

  return {
    moveData: data !== null ? MoveDataHelper.get(data, history[resetBoardId], resetBoardId) : null,
    loading,
    error,
  };
};

export default connect(mapStateToProps)(Results);
