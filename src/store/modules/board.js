import last from 'lodash/last';
import nth from 'lodash/nth';

import { APP_NAME } from '../../constants';
import { BoardHelper } from '../../helpers';
import { showConfirmationDialog } from './ui';

/* Actions */
const ADD_PIECE = `${APP_NAME}/board/ADD_PIECE`;
const MOVE_PIECE = `${APP_NAME}/board/MOVE_PIECE`;
const REMOVE_PIECE = `${APP_NAME}/board/REMOVE_PIECE`;
const REVERT_BOARD = `${APP_NAME}/board/REVERT_BOARD`;
const SET_HINT = `${APP_NAME}/board/SET_HINT`;
const SET_RESET_BOARD_ID = `${APP_NAME}/board/SET_RESET_BOARD_ID`;

const defaultState = {
  hint: {},
  history: [{}],
  resetBoardId: 0,
};

/* Reducer */
export default function reducer(board = defaultState, action) {
  const currentBoard = last(board.history);

  switch (action.type) {
    case ADD_PIECE: {
      const history = [...board.history, BoardHelper.addPiece(currentBoard, action.piece)];
      return { ...board, history };
    }
    case MOVE_PIECE: {
      const history = [...board.history, BoardHelper.movePiece(currentBoard, action.move)];
      return { ...board, history };
    }
    case REMOVE_PIECE: {
      const history = [...board.history, BoardHelper.removePiece(currentBoard, action.position)];
      return { ...board, history };
    }
    case REVERT_BOARD: {
      const history = [...board.history, nth(board.history, action.index)];
      return { ...board, history };
    }
    case SET_HINT:
      return { ...board, hint: action.hint };
    case SET_RESET_BOARD_ID:
      return { ...board, resetBoardId: board.history.length - 1 };
    default:
      return board;
  }
}

/* Action Creators */
export const addPiece = piece => ({
  piece,
  type: ADD_PIECE,
});

export const movePiece = move => ({
  move,
  type: MOVE_PIECE,
});

export const removePiece = position => ({
  position,
  type: REMOVE_PIECE,
});

export const revertBoard = index => ({
  index,
  type: REVERT_BOARD,
});

export const setHint = hint => ({
  hint,
  type: SET_HINT,
});

export const setResetBoardId = () => ({
  type: SET_RESET_BOARD_ID,
});

/**
 * Middleware
 */
export const pieceChangeMiddleware = store => next => action => {
  let resultingAction = action;

  if ([ADD_PIECE, MOVE_PIECE, REMOVE_PIECE].includes(action.type) && store.getState().results.data !== null) {
    resultingAction = showConfirmationDialog({
      title: 'Warning',
      text: 'This will clear current results. Continue?',
      onConfirm: () => next(action),
    });
  }

  return next(resultingAction);
};
