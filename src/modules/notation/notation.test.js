import { PieceCodes } from '../../constants';
import { COLOR } from '../chess';
import { PIECE_TYPE } from '../piece';
import { getMoveNotation } from './notation';

const { BLACK, WHITE } = COLOR;
const { KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPE;

describe('getMoveNotation', () => {
  it('should return the notation for a white piece move', () => {
    const board = { B3: { type: PAWN, color: WHITE, position: 'B3' } };

    expect(getMoveNotation(board, 'B3-B4', ['B3-B4'])).toEqual({
      pieceCode: PieceCodes[WHITE][PAWN],
      text: 'b4',
      promotionCode: '',
    });
  });

  it('should return the notation for a black piece move', () => {
    const board = { B3: { type: PAWN, color: BLACK, position: 'B3' } };

    expect(getMoveNotation(board, 'B3-B4', ['B3-B4'])).toEqual({
      pieceCode: PieceCodes[BLACK][PAWN],
      text: 'b4',
      promotionCode: '',
    });
  });

  it('should return the notation for a promotion move', () => {
    const board = { B7: { type: PAWN, color: WHITE, position: 'B7' } };

    expect(getMoveNotation(board, 'B7-B8=Q', ['B7-B8=B', 'B7-B8=N', 'B7-B8=Q', 'B7-B8=R'])).toEqual(
      {
        pieceCode: PieceCodes[WHITE][PAWN],
        text: 'b8=',
        promotionCode: PieceCodes[WHITE][QUEEN],
      },
    );
  });

  it('should specify the column for an ambiguous move', () => {
    const boardWithQueens = {
      A1: { type: ROOK, color: WHITE, position: 'A1' },
      H8: { type: ROOK, color: WHITE, position: 'H8' },
    };

    expect(getMoveNotation(boardWithQueens, 'A1-A8', ['A1-A8', 'H8-A8'])).toEqual({
      pieceCode: PieceCodes[WHITE][ROOK],
      text: 'aa8',
      promotionCode: '',
    });

    const boardWithKnights = {
      C2: { type: KNIGHT, color: WHITE, position: 'C2' },
      E6: { type: KNIGHT, color: WHITE, position: 'E6' },
      F3: { type: KNIGHT, color: WHITE, position: 'F3' },
    };

    expect(getMoveNotation(boardWithKnights, 'C2-D4', ['E6-D4', 'F3-D4'])).toEqual({
      pieceCode: PieceCodes[WHITE][KNIGHT],
      text: 'cd4',
      promotionCode: '',
    });
  });

  it('should specify the row for an ambiguous move where the column is not enough', () => {
    const board = {
      A1: { type: ROOK, color: WHITE, position: 'A1' },
      A8: { type: ROOK, color: WHITE, position: 'A8' },
    };

    expect(getMoveNotation(board, 'A1-A4', ['A1-A4', 'A8-A4'])).toEqual({
      pieceCode: PieceCodes[WHITE][ROOK],
      text: '1a4',
      promotionCode: '',
    });
  });

  it('should specify both the row and the column for an ambiguous move where both are required to disambiguate it', () => {
    const board = {
      A1: { type: QUEEN, color: WHITE, position: 'A1' },
      A8: { type: QUEEN, color: WHITE, position: 'A8' },
      D1: { type: QUEEN, color: WHITE, position: 'D1' },
    };

    expect(getMoveNotation(board, 'A1-A4', ['A1-A4', 'A8-A4', 'D1-A4'])).toEqual({
      pieceCode: PieceCodes[WHITE][QUEEN],
      text: 'a1a4',
      promotionCode: '',
    });
  });
});
