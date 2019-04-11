const BISHOP = 'bishop';
const KING = 'king';
const KNIGHT = 'knight';
const PAWN = 'pawn';
const QUEEN = 'queen';
const ROOK = 'rook';

export default {
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  fromPromotion: promotion => {
    switch (promotion.toUpperCase()) {
      case 'B':
        return BISHOP;
      case 'N':
        return KNIGHT;
      case 'Q':
        return QUEEN;
      case 'R':
        return ROOK;
      default:
        return null;
    }
  },
};
