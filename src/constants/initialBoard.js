import { COLOR, PIECE_TYPE } from '../enums';

const { BLACK, WHITE } = COLOR;
const { PAWN, KNIGHT, BISHOP, ROOK, KING, QUEEN } = PIECE_TYPE;

export const INITIAL_BOARD = {
  A2: {
    type: PAWN,
    color: WHITE,
    position: 'A2',
  },
  B2: {
    type: PAWN,
    color: WHITE,
    position: 'B2',
  },
  C2: {
    type: PAWN,
    color: WHITE,
    position: 'C2',
  },
  D2: {
    type: PAWN,
    color: WHITE,
    position: 'D2',
  },
  E2: {
    type: PAWN,
    color: WHITE,
    position: 'E2',
  },
  F2: {
    type: PAWN,
    color: WHITE,
    position: 'F2',
  },
  G2: {
    type: PAWN,
    color: WHITE,
    position: 'G2',
  },
  H2: {
    type: PAWN,
    color: WHITE,
    position: 'H2',
  },
  A1: {
    type: ROOK,
    color: WHITE,
    position: 'A1',
  },
  H1: {
    type: ROOK,
    color: WHITE,
    position: 'H1',
  },
  B1: {
    type: KNIGHT,
    color: WHITE,
    position: 'B1',
  },
  G1: {
    type: KNIGHT,
    color: WHITE,
    position: 'G1',
  },
  C1: {
    type: BISHOP,
    color: WHITE,
    position: 'C1',
  },
  F1: {
    type: BISHOP,
    color: WHITE,
    position: 'F1',
  },
  D1: {
    type: QUEEN,
    color: WHITE,
    position: 'D1',
  },
  E1: {
    type: KING,
    color: WHITE,
    position: 'E1',
  },
  A7: {
    type: PAWN,
    color: BLACK,
    position: 'A7',
  },
  B7: {
    type: PAWN,
    color: BLACK,
    position: 'B7',
  },
  C7: {
    type: PAWN,
    color: BLACK,
    position: 'C7',
  },
  D7: {
    type: PAWN,
    color: BLACK,
    position: 'D7',
  },
  E7: {
    type: PAWN,
    color: BLACK,
    position: 'E7',
  },
  F7: {
    type: PAWN,
    color: BLACK,
    position: 'F7',
  },
  G7: {
    type: PAWN,
    color: BLACK,
    position: 'G7',
  },
  H7: {
    type: PAWN,
    color: BLACK,
    position: 'H7',
  },
  A8: {
    type: ROOK,
    color: BLACK,
    position: 'A8',
  },
  H8: {
    type: ROOK,
    color: BLACK,
    position: 'H8',
  },
  B8: {
    type: KNIGHT,
    color: BLACK,
    position: 'B8',
  },
  G8: {
    type: KNIGHT,
    color: BLACK,
    position: 'G8',
  },
  C8: {
    type: BISHOP,
    color: BLACK,
    position: 'C8',
  },
  F8: {
    type: BISHOP,
    color: BLACK,
    position: 'F8',
  },
  D8: {
    type: QUEEN,
    color: BLACK,
    position: 'D8',
  },
  E8: {
    type: KING,
    color: BLACK,
    position: 'E8',
  },
};
