import { last } from 'lodash';
import { connect } from 'react-redux';

import { ExportDialog } from '../../components/Dialog';
import Dialog from './Dialog';

const mapStateToProps = state => ({
  board: last(state.board.history),
});

export default connect(mapStateToProps)(Dialog(ExportDialog));
