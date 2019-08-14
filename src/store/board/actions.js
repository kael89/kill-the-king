import { addMove } from '../moveHistory/actions';

export const ADD_PIECE = 'ADD_PIECE';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const IMPORT_BOARD = 'IMPORT_BOARD';
export const MOVE_PIECE = 'MOVE_PIECE';
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const PLAY_MOVE = 'PLAY_MOVE';
export const REVERT_BOARD = 'REVERT_BOARD';
export const SET_HINT = 'SET_HINT';
export const SET_RESET_BOARD_ID = 'SET_RESET_BOARD_ID';
export const SETUP_DEFAULT_BOARD = 'SETUP_DEFAULT_BOARD';

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
