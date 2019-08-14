import { last } from 'lodash';
import nth from 'lodash/nth';

import { INITIAL_BOARD } from '../../constants';
import { parseMoveString } from '../../utilities/move';
import {
  ADD_PIECE,
  CLEAR_BOARD,
  IMPORT_BOARD,
  MOVE_PIECE,
  PLAY_MOVE,
  REMOVE_PIECE,
  REVERT_BOARD,
  SET_HINT,
  SET_RESET_BOARD_ID,
  SETUP_DEFAULT_BOARD,
} from './actions';

const addPiece = (board, piece) => ({ ...board, [piece.position]: piece });

const removePiece = (board, position) => {
  const newBoard = { ...board };
  delete newBoard[position];

  return newBoard;
};

export const movePiece = (board, moveString) => {
  const { source, target } = parseMoveString(moveString);
  const piece = { ...board[source] };
  piece.position = target;
  const newBoard = removePiece(board, source);

  return addPiece(newBoard, piece);
};

const defaultState = {
  hint: {},
  history: [{}],
  resetBoardId: 0,
};

export default (board = defaultState, action) => {
  const currentBoard = last(board.history);

  switch (action.type) {
    case ADD_PIECE: {
      const history = [...board.history, addPiece(currentBoard, action.piece)];
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
      const history = [...board.history, movePiece(currentBoard, action.move)];
      return { ...board, history };
    }
    case REMOVE_PIECE: {
      const history = [...board.history, removePiece(currentBoard, action.position)];
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
      const history = [...board.history, INITIAL_BOARD];
      return { ...board, history };
    }
    default:
      return board;
  }
};
