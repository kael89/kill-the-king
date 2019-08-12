import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { setSetting } from '../store/settings/actions';

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setSetting: (name, value) => dispatch(setSetting({ [name]: value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
