import { APP_NAME } from '../../constants';
import { showDialog } from './ui';

/* Actions */
const SET_ON_CONFIRM = `${APP_NAME}/confirmationDialog/SET_CONFIRMABLE_ACTION`;

const defaultState = {
  onConfirm: null,
};

/* Reducer */
export default function reducer(confirmationDialog = defaultState, action) {
  switch (action.type) {
    case SET_ON_CONFIRM:
      return { ...confirmationDialog, onConfirm: action.onConfirm };
    default:
      return confirmationDialog;
  }
}

/* Action Creators */
const setOnConfirm = onConfirm => ({
  onConfirm,
  type: SET_ON_CONFIRM,
});

export const showConfirmationDialog = (dialogId, onConfirm) => dispatch => {
  dispatch(showDialog(dialogId));
  dispatch(setOnConfirm(onConfirm));
};
