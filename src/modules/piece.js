/** @type {PieceType} */
const BISHOP = 'bishop';
/** @type {PieceType} */
const KING = 'king';
/** @type {PieceType} */
const KNIGHT = 'knight';
/** @type {PieceType} */
const PAWN = 'pawn';
/** @type {PieceType} */
const QUEEN = 'queen';
/** @type {PieceType} */
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
