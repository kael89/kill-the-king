import { connect } from 'react-redux';

import { ImportDialog } from '../../components/Dialog';
import { importBoard } from '../../store/board/actions';
import { hideDialog } from '../../store/ui/actions';
import Dialog from './Dialog';

const mapDispatchToProps = dispatch => ({
  onImport: boardJson => {
    dispatch(importBoard(boardJson));
    dispatch(hideDialog());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Dialog(ImportDialog));
