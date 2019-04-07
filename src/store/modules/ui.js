import { APP_NAME, DefaultSettings } from '../../constants';
import { SettingKey } from '../../enums';
import themes from '../../themes';

/* Actions */
const CHANGE_THEME = `${APP_NAME}/ui/CHANGE_THEME`;
const TOGGLE_BOARD_HINT = `${APP_NAME}/ui/TOGGLE_BOARD_HINT`;
const TOGGLE_DIALOG = `${APP_NAME}/ui/TOGGLE_DIALOG`;

const defaultState = {
  dialogOpen: false,
  isHintVisible: false,
  theme: themes[DefaultSettings[SettingKey.DEFAULT_THEME]],
};

/* Reducer */
export default function reducer(ui = defaultState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...ui, theme: action.theme };
    case TOGGLE_BOARD_HINT:
      return { ...ui, isHintVisible: action.visible };
    case TOGGLE_DIALOG:
      return { ...ui, dialogOpen: action.open };
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

export const openDialog = () => ({
  open: true,
  type: TOGGLE_DIALOG,
});

export const closeDialog = () => ({
  open: false,
  type: TOGGLE_DIALOG,
});
