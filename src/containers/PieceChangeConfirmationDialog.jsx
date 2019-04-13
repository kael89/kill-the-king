import { connect } from 'react-redux';

import { clearResults } from '../store/modules/results';
import ConfirmationDialogContainer from './ConfirmationDialogContainer';

const mapDispatchToProps = dispatch => ({
  onConfirm: () => dispatch(clearResults()),
});

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmationDialogContainer);
