import { PIECE_TYPE } from '../enums';

const { BISHOP, KNIGHT, QUEEN, ROOK } = PIECE_TYPE;

const PROMOTION_TO_PIECE_TYPE = {
  B: BISHOP,
  N: KNIGHT,
  Q: QUEEN,
  R: ROOK,
};

/**
 * @param {string} promotion
 * @returns {PieceType}
 */
export const promotionToPieceType = promotion => PROMOTION_TO_PIECE_TYPE[promotion.toUpperCase()];

/**
 * @param {string} moveString
 * @returns {Move}
 */
export const parseMoveString = moveString => {
  const regexp = /([A-H][1-8])-([A-H][1-8])(=([bnqr]))?/i;
  const [, source, target, , promotion] = moveString.match(regexp);

  return { source, target, promotion: promotion || '' };
};

/**
 * @param {Move} move
 * @returns {string}
 */
export const moveToString = ({ source, target, promotion }) => {
  let result = `${source}-${target}`;
  if (promotion) {
    result += `=${promotion}`;
  }

  return result;
};
