import { connect } from 'react-redux';

import { ImportDialog } from '../../components/Dialog';
import { importBoard } from '../../store/modules/board';
import { hideDialog } from '../../store/modules/ui';
import Dialog from './Dialog';

const mapDispatchToProps = dispatch => ({
  onImport: board => {
    dispatch(importBoard(board));
    dispatch(hideDialog());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Dialog(ImportDialog));
