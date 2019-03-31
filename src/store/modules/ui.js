import { APP_NAME, DefaultSettings } from '../../constants';
import { SettingKey } from '../../enums';
import themes from '../../themes';

/* Actions */
const CHANGE_THEME = `${APP_NAME}/ui/CHANGE_THEME`;
const TOGGLE_BOARD_HINT = `${APP_NAME}/ui/TOGGLE_BOARD_HINT`;

const defaultState = {
  isHintVisible: false,
  theme: themes[DefaultSettings[SettingKey.DEFAULT_THEME]],
};

/* Reducer */
export default function reducer(ui = defaultState, action) {
  switch (action.type) {
    case CHANGE_THEME: {
      return { ...ui, theme: action.theme };
    }
    case TOGGLE_BOARD_HINT: {
      return { ...ui, isHintVisible: action.visible };
    }
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

export const toggleBoardHint = visible => ({
  visible,
  type: TOGGLE_BOARD_HINT,
});

export const showBoardHint = () => ({
  visible: true,
  type: TOGGLE_BOARD_HINT,
});

export const hideBoardHint = () => ({
  visible: false,
  type: TOGGLE_BOARD_HINT,
});
