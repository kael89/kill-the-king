import { isEqual, last } from 'lodash';
import nth from 'lodash/nth';

import { APP_NAME } from '../../constants';
import { Dialog } from '../../enums';
import {
  addPiece as addPieceHelper,
  getDefaultSetup,
  movePiece as movePieceHelper,
  removePiece as removePieceHelper,
} from '../../modules/board';
import { showConfirmationDialog } from './confirmationDialog';
import { addMove } from './moveHistory';
import { clearResults } from './results';

/* Actions */
const ADD_PIECE = `${APP_NAME}/board/ADD_PIECE`;
const CLEAR_BOARD = `${APP_NAME}/board/CLEAR_BOARD`;
const IMPORT_BOARD = `${APP_NAME}/board/IMPORT_BOARD`;
const MOVE_PIECE = `${APP_NAME}/board/MOVE_PIECE`;
const REMOVE_PIECE = `${APP_NAME}/board/REMOVE_PIECE`;
const PLAY_MOVE = `${APP_NAME}/board/PLAY_MOVE`;
const REVERT_BOARD = `${APP_NAME}/board/REVERT_BOARD`;
const SET_HINT = `${APP_NAME}/board/SET_HINT`;
const SET_RESET_BOARD_ID = `${APP_NAME}/board/SET_RESET_BOARD_ID`;
const SETUP_DEFAULT_BOARD = `${APP_NAME}/board/SETUP_DEFAULT_BOARD`;

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
      const history = [...board.history, addPieceHelper(currentBoard, action.piece)];
      return { ...board, history };
    }
    case CLEAR_BOARD: {
      const history = [...board.history, {}];
      return { ...board, history };
    }
    case IMPORT_BOARD: {
      const history = [...board.history, action.board];
      return { ...board, history };
    }
    case MOVE_PIECE:
    case PLAY_MOVE: {
      const history = [...board.history, movePieceHelper(currentBoard, action.move)];
      return { ...board, history };
    }
    case REMOVE_PIECE: {
      const history = [...board.history, removePieceHelper(currentBoard, action.position)];
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
    case SETUP_DEFAULT_BOARD: {
      const history = [...board.history, getDefaultSetup()];
      return { ...board, history };
    }
    default:
      return board;
  }
}

/* Action Creators */
export const addPiece = piece => ({
  piece,
  type: ADD_PIECE,
});

export const clearBoard = () => ({
  type: CLEAR_BOARD,
});

export const importBoard = boardJson => ({
  board: JSON.parse(boardJson),
  type: IMPORT_BOARD,
});

export const setupDefaultBoard = () => ({
  type: SETUP_DEFAULT_BOARD,
});

export const movePiece = move => ({
  move,
  type: MOVE_PIECE,
});

export const playMove = moveDatum => dispatch => {
  dispatch(addMove(moveDatum));
  dispatch({
    move: moveDatum.move,
    type: PLAY_MOVE,
  });
};

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
const shouldConfirmChange = (state, action) => {
  const restrictedActionsTypes = [ADD_PIECE, CLEAR_BOARD, MOVE_PIECE, REMOVE_PIECE, SETUP_DEFAULT_BOARD];

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
      return fetchedDataExist && !isEqual(getDefaultSetup(), currentBoard);
    }
    default:
      return fetchedDataExist;
  }
};

export const pieceChangeMiddleware = store => next => action => {
  const resultingAction = shouldConfirmChange(store.getState(), action)
    ? showConfirmationDialog(Dialog.PIECE_CHANGE_CONFIRMATION, () => {
        next(clearResults());
        next(action);
      })
    : action;
  return next(resultingAction);
};
