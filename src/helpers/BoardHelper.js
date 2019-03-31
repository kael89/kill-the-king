/**
 *  Provides methods for immutably changing the board's state
 */

import MoveHelper from './MoveHelper';

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

export default {
  addPiece,
  getPiece,
  movePiece,
  removePiece,
};
