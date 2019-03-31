import { connect } from 'react-redux';

import Results from '../components/Results';

const extractResults = data => (data !== null ? Object.keys(data) : data);

const mapStateToProps = state => {
  const { history, resetBoardId } = state.board;
  const { data, loading, error } = state.results;

  return {
    data: extractResults(data),
    initialBoard: history[resetBoardId],
    loading,
    error,
  };
};

export default connect(mapStateToProps)(Results);
