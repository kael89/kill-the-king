import { Color, PieceType } from '../enums';
import { isValidJson } from '../utils';
import { stringToMove } from './move';

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
export const getInitialBoardSetup = () => {
  return defaultBoard;
};

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
