import { connect } from 'react-redux';

import Square from '../components/Square';

const mapStateToProps = state => {
  const {
    ui: { hintVisible },
  } = state;

  return {
    hinted: hintVisible,
  };
};

export default connect(mapStateToProps)(Square);
