import { Color, PieceType } from '../enums';
import { isValidJson } from '../utils';
import MoveHelper from './MoveHelper';

const DEFAULT_BOARD_DATA = {
  [Color.WHITE]: {
    [PieceType.PAWN]: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
    [PieceType.ROOK]: ['A1', 'H1'],
    [PieceType.KNIGHT]: ['B1', 'G1'],
    [PieceType.BISHOP]: ['C1', 'F1'],
    [PieceType.QUEEN]: ['D1'],
    [PieceType.KING]: ['E1'],
  },
  [Color.BLACK]: {
    [PieceType.PAWN]: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],
    [PieceType.ROOK]: ['A8', 'H8'],
    [PieceType.KNIGHT]: ['B8', 'G8'],
    [PieceType.BISHOP]: ['C8', 'F8'],
    [PieceType.QUEEN]: ['D8'],
    [PieceType.KING]: ['E8'],
  },
};

const defaultBoard = {};
Object.entries(DEFAULT_BOARD_DATA).forEach(([color, pieceData]) => {
  Object.entries(pieceData).forEach(([type, positions]) => {
    positions.forEach(position => {
      defaultBoard[position] = { type, color, position };
    });
  });
});

/**
 * @returns {Board}
 */
const getDefaultSetup = () => {
  return defaultBoard;
};

/**
 * @param {Board} board
 * @param {string} position
 * @returns {Piece}
 */
const getPiece = (board, position) => {
  return { ...board[position] };
};

/**
 * @param {Board} board
 * @param {Piece} piece
 * @returns {Board}
 */
const addPiece = (board, piece) => {
  return { ...board, [piece.position]: piece };
};

/**
 * @param {Board} board
 * @param {string} position
 * @returns {Board}
 */
const removePiece = (board, position) => {
  const newBoard = { ...board };
  delete newBoard[position];
  return newBoard;
};

/**
 * @param {Board} board
 * @param {string} moveString
 * @returns {Board}
 */
const movePiece = (board, moveString) => {
  const { source, target } = MoveHelper.parse(moveString);
  const piece = getPiece(board, source);
  piece.position = target;

  const newBoard = removePiece(board, source);
  return addPiece(newBoard, piece);
};

/**
 * @param {string} json
 * @returns {string} The error message, or empty string if no errors were detected
 */
const validateJson = json => (isValidJson(json) ? '' : 'Invalid data');

export default {
  addPiece,
  getDefaultSetup,
  getPiece,
  movePiece,
  removePiece,
  validateJson,
};
