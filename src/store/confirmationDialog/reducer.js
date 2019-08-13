import { SET_ON_CONFIRM } from './actions';

const defaultState = {
  onConfirm: null,
};

export default (confirmationDialog = defaultState, action) => {
  switch (action.type) {
    case SET_ON_CONFIRM:
      return { ...confirmationDialog, onConfirm: action.onConfirm };
    default:
      return confirmationDialog;
  }
};
