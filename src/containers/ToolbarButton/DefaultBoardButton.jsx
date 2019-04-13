import { connect } from 'react-redux';

import ToolbarButton from '../../components/ToolbarButton';
import { setupDefaultBoard } from '../../store/modules/board';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(setupDefaultBoard()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ToolbarButton);
