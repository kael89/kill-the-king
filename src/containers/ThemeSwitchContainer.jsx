import { connect } from 'react-redux';

import ThemeSwitch from '../components/ThemeSwitch';
import { Theme } from '../enums';
import { changeTheme } from '../store/modules/ui';
import themes from '../themes';

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeTheme(e.target.checked ? themes[Theme.DARK] : themes[Theme.LIGHT])),
});

export default connect(
  null,
  mapDispatchToProps,
)(ThemeSwitch);
