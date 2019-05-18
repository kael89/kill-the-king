import { APP_NAME } from '../../constants';
import { DEFAULT_SETTINGS } from '../../modules/settings';
import themes from '../../themes';

/* Actions */
const CHANGE_THEME = `${APP_NAME}/ui/CHANGE_THEME`;
const TOGGLE_BOARD_HINT = `${APP_NAME}/ui/TOGGLE_BOARD_HINT`;
const TOGGLE_DIALOG = `${APP_NAME}/ui/TOGGLE_DIALOG`;

const defaultState = {
  hintVisible: false,
  theme: themes[DEFAULT_SETTINGS.defaultTheme],
  visibleDialog: '',
};

/* Reducer */
export default function reducer(ui = defaultState, action) {
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
}

/* Action Creators */
export const changeTheme = theme => ({
  theme,
  type: CHANGE_THEME,
});

export const showBoardHint = () => ({
  visible: true,
  type: TOGGLE_BOARD_HINT,
});

export const hideBoardHint = () => ({
  visible: false,
  type: TOGGLE_BOARD_HINT,
});

export const showDialog = dialogId => ({
  visibleDialog: dialogId,
  type: TOGGLE_DIALOG,
});

export const hideDialog = () => ({
  visibleDialog: '',
  type: TOGGLE_DIALOG,
});
