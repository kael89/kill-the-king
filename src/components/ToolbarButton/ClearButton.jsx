import { connect } from 'react-redux';

import { clearBoard } from '../../store/board/actions';
import ToolbarButton from './ToolbarButton';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(clearBoard()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
