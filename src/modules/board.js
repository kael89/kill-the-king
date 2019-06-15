import { isValidJson } from '../utils';
import { COLOR } from './chess';
import { stringToMove } from './move';
import { PIECE_TYPE } from './piece';

const { BLACK, WHITE } = COLOR;
const { PAWN, KNIGHT, BISHOP, ROOK, KING, QUEEN } = PIECE_TYPE;

const INITIAL_BOARD_DATA = {
  [WHITE]: {
    [PAWN]: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
    [ROOK]: ['A1', 'H1'],
    [KNIGHT]: ['B1', 'G1'],
    [BISHOP]: ['C1', 'F1'],
    [QUEEN]: ['D1'],
    [KING]: ['E1'],
  },
  [BLACK]: {
    [PAWN]: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
    [ROOK]: ['A8', 'H8'],
    [KNIGHT]: ['B8', 'G8'],
    [BISHOP]: ['C8', 'F8'],
    [QUEEN]: ['D8'],
    [KING]: ['E8'],
  },
};

/**
 * @type {Board}
 */
export const INITIAL_BOARD = {};
Object.entries(INITIAL_BOARD_DATA).forEach(([color, pieceData]) => {
  Object.entries(pieceData).forEach(([type, positions]) => {
    positions.forEach(position => {
      INITIAL_BOARD[position] = { type, color, position };
    });
  });
});

/**
 * @param {Board} board
 * @param {Piece} piece
 * @returns {Board}
 */
export const addPiece = (board, piece) => {
  return { ...board, [piece.position]: piece };
};

/**
 * @param {Board} board
 * @param {string} position
 * @returns {Board}
 */
export const removePiece = (board, position) => {
  const newBoard = { ...board };
  delete newBoard[position];
  return newBoard;
};

/**
 * @param {Board} board
 * @param {string} moveString
 * @returns {Board}
 */
export const movePiece = (board, moveString) => {
  const { source, target } = stringToMove(moveString);
  const piece = { ...board[source] };
  piece.position = target;

  const newBoard = removePiece(board, source);
  return addPiece(newBoard, piece);
};

/**
 * @param {string} json
 * @returns {string} The error message, or empty string if no errors were detected
 */
export const validateBoardJson = json => (isValidJson(json) ? '' : 'Invalid data');
