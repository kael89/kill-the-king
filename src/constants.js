import { COLOR } from './modules/chess';
import { PIECE_TYPE } from './modules/piece';

const { BLACK, WHITE } = COLOR;
const { PAWN, KNIGHT, BISHOP, ROOK, KING, QUEEN } = PIECE_TYPE;

export const APP_NAME = 'chasemate';

export const BOARD_SIZE = 8;

export const PieceCodes = {
  [BLACK]: {
    [BISHOP]: '\u265D',
    [KING]: '\u265A',
    [KNIGHT]: '\u265E',
    [PAWN]: '\u265F',
    [QUEEN]: '\u265B',
    [ROOK]: '\u265C',
  },
  [WHITE]: {
    [BISHOP]: '\u2657',
    [KING]: '\u2654',
    [KNIGHT]: '\u2658',
    [PAWN]: '\u2659',
    [QUEEN]: '\u2655',
    [ROOK]: '\u2656',
  },
};
