import { connect } from 'react-redux';

import { setupDefaultBoard } from '../../store/board/actions';
import ToolbarButton from './ToolbarButton';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(setupDefaultBoard()),
});

export default connect(null, mapDispatchToProps)(ToolbarButton);
