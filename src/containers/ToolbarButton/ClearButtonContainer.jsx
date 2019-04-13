import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { clearBoard } from '../../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(clearBoard()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
