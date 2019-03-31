import { connect } from 'react-redux';

import ThemeProvider from '../components/ThemeProvider';

const mapStateToProps = state => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps)(ThemeProvider);
