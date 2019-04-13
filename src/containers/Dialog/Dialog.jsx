import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  open: state.ui.visibleDialog === ownProps.id,
});

export default DialogComponent => connect(mapStateToProps)(DialogComponent);
