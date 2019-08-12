import { showDialog } from '../ui/actions';

export const SET_ON_CONFIRM = 'SET_ON_CONFIRM';

const setOnConfirm = onConfirm => ({
  onConfirm,
  type: SET_ON_CONFIRM,
});

export const showConfirmationDialog = (dialogId, onConfirm) => dispatch => {
  dispatch(showDialog(dialogId));
  dispatch(setOnConfirm(onConfirm));
};
