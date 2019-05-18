const BISHOP = 'bishop';
const KING = 'king';
const KNIGHT = 'knight';
const PAWN = 'pawn';
const QUEEN = 'queen';
const ROOK = 'rook';

/**
 * Piece types sorted by their power (ascending)
 *
 * @enum {PieceType}
 */
export const PIECE_TYPE = {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  KING,
  QUEEN,
};

const PROMOTION_TO_PIECE_TYPE = {
  B: BISHOP,
  N: KNIGHT,
  Q: QUEEN,
  R: ROOK,
};

/**
 * @param {string} promotion
 * @returns {string}
 */
export const parsePromotion = promotion => PROMOTION_TO_PIECE_TYPE[promotion.toUpperCase()];
