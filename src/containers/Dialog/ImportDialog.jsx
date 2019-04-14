import { connect } from 'react-redux';

import { ImportDialog } from '../../components/Dialog';
import { hideDialog } from '../../store/modules/ui';
import Dialog from './Dialog';

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(hideDialog()),
  onImport: () => {
    console.log('imported');
    dispatch(hideDialog());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Dialog(ImportDialog));
