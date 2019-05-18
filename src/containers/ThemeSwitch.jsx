import { connect } from 'react-redux';

import ThemeSwitch from '../components/ThemeSwitch';
import { changeTheme } from '../store/modules/ui';
import themes, { THEME_NAME } from '../themes';

const { DARK, LIGHT } = THEME_NAME;

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeTheme(e.target.checked ? themes[DARK] : themes[LIGHT])),
});

export default connect(
  null,
  mapDispatchToProps,
)(ThemeSwitch);
