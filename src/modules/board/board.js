import { parseMoveString } from '../../utilities/move';

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
  const { source, target } = parseMoveString(moveString);
  const piece = { ...board[source] };
  piece.position = target;
  const newBoard = removePiece(board, source);

  return addPiece(newBoard, piece);
};
