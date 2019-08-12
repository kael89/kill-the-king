import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { clearBoard } from '../../store/board/actions';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(clearBoard()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
