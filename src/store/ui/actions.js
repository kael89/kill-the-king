export const CHANGE_THEME = 'CHANGE_THEME';
export const TOGGLE_BOARD_HINT = 'TOGGLE_BOARD_HINT';
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

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
