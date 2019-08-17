import { isEqual, last } from 'lodash';

import { INITIAL_BOARD } from '../constants';
import { DIALOG_NAME } from '../enums';
import {
  ADD_PIECE,
  CLEAR_BOARD,
  MOVE_PIECE,
  REMOVE_PIECE,
  SETUP_DEFAULT_BOARD,
} from './board/actions';
import { showConfirmationDialog } from './confirmationDialog/actions';
import { clearResults } from './results/actions';

const shouldConfirmChange = (state, action) => {
  const restrictedActionsTypes = [
    ADD_PIECE,
    CLEAR_BOARD,
    MOVE_PIECE,
    REMOVE_PIECE,
    SETUP_DEFAULT_BOARD,
  ];

  if (!restrictedActionsTypes.includes(action.type)) {
    return false;
  }

  const fetchedDataExist = state.results.data !== null;
  const currentBoard = last(state.board.history);

  switch (action.type) {
    case ADD_PIECE: {
      const { piece } = action;
      return fetchedDataExist && !isEqual(piece, currentBoard[piece.position]);
    }
    case SETUP_DEFAULT_BOARD: {
      return fetchedDataExist && !isEqual(INITIAL_BOARD, currentBoard);
    }
    default:
      return fetchedDataExist;
  }
};

export const pieceChangeMiddleware = store => next => action => {
  const resultingAction = shouldConfirmChange(store.getState(), action)
    ? showConfirmationDialog(DIALOG_NAME.PIECE_CHANGE_CONFIRMATION, () => {
        next(clearResults());
        next(action);
      })
    : action;
  return next(resultingAction);
};
