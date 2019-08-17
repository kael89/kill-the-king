import { DEFAULT_SETTINGS } from '../../constants';
import themes from '../../themes';
import { CHANGE_THEME, TOGGLE_BOARD_HINT, TOGGLE_DIALOG } from './actions';

const defaultState = {
  hintVisible: false,
  theme: themes[DEFAULT_SETTINGS.defaultTheme],
  visibleDialog: '',
};

export default (ui = defaultState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...ui, theme: action.theme };
    case TOGGLE_BOARD_HINT:
      return { ...ui, hintVisible: action.visible };
    case TOGGLE_DIALOG:
      return { ...ui, visibleDialog: action.visibleDialog };
    default: {
      return ui;
    }
  }
};
