import { PieceCodes } from '../constants';
import { PieceType } from '../enums';
import MoveHelper from '../helpers/MoveHelper';

/**
 * @param {string} move
 * @returns {Notation}
 */
export const getNotation = (board, move) => {
  const { source, target, promotion } = MoveHelper.parse(move);
  const piece = board[source];
  const { type, color } = piece;

  return {
    code: PieceCodes[color][type],
    text: target.toLowerCase() + (promotion ? '=' : ''),
    promotionCode: PieceCodes[color][PieceType.fromPromotion(promotion)],
  };
};
