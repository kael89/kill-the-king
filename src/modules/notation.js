import { PieceCodes } from '../constants';
import { PieceType } from '../enums';
import { parseMove } from './move';

/**
 * @param {string} move
 * @returns {Notation}
 */
export const getNotation = (board, move) => {
  const { source, target, promotion } = parseMove(move);
  const piece = board[source];
  const { type, color } = piece;

  return {
    code: PieceCodes[color][type],
    text: target.toLowerCase() + (promotion ? '=' : ''),
    promotionCode: PieceCodes[color][PieceType.fromPromotion(promotion)],
  };
};
