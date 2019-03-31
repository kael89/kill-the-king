import { PieceCodes } from '../constants';
import MoveHelper from './MoveHelper';

/**
 * @param {string} move
 * @returns {Notation}
 */
const getNotation = (board, move) => {
  const { source, target } = MoveHelper.parse(move);
  const piece = board[source];
  const { type, color } = piece;

  return {
    code: PieceCodes[color][type],
    text: target.toLowerCase(),
  };
};

export default {
  getNotation,
};
