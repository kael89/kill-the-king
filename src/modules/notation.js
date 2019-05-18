import { PieceCodes } from '../constants';
import { stringToMove } from './move';
import { parsePromotion } from './piece';

/**
 * @param {Board} board
 * @param {string} move
 * @returns {Notation}
 */
export const getMoveNotation = (board, move) => {
  const { source, target, promotion } = stringToMove(move);
  const piece = board[source];
  const { type, color } = piece;

  return {
    code: PieceCodes[color][type],
    text: target.toLowerCase() + (promotion ? '=' : ''),
    promotionCode: PieceCodes[color][parsePromotion(promotion)],
  };
};
