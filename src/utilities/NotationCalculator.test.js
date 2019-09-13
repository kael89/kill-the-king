import { PIECE_CODES } from '../constants';
import { COLOR, PIECE_TYPE } from '../enums';
import { NotationCalculator } from './NotationCalculator';

const { BLACK, WHITE } = COLOR;
const { KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPE;

describe('NotationCalculator', () => {
  describe('calculate()', () => {
    it('should return the notation for a white piece move', () => {
      const board = { B1: { type: ROOK, color: WHITE, position: 'B1' } };
      const calculator = new NotationCalculator(board, ['B1-B2']);

      expect(calculator.calculate('B1-B2')).toEqual({
        pieceCode: PIECE_CODES[WHITE][ROOK],
        text: 'b2',
        promotionCode: '',
      });
    });

    it('should return the notation for a black piece move', () => {
      const board = { B1: { type: ROOK, color: BLACK, position: 'B1' } };
      const calculator = new NotationCalculator(board, ['B1-B2']);

      expect(calculator.calculate('B1-B2')).toEqual({
        pieceCode: PIECE_CODES[BLACK][ROOK],
        text: 'b2',
        promotionCode: '',
      });
    });

    it('should not use a piece symbol for a pawn move', () => {
      const board = { E2: { type: PAWN, color: WHITE, position: 'E2' } };
      const calculator = new NotationCalculator(board, ['E2-E4']);

      expect(calculator.calculate('E2-E4')).toEqual({
        pieceCode: '',
        text: 'e4',
        promotionCode: '',
      });
    });

    it('should return the notation for a capture move', () => {
      const board = {
        B2: { type: ROOK, color: WHITE, position: 'B2' },
        B7: { type: PAWN, color: BLACK, position: 'B7' },
      };
      const calculator = new NotationCalculator(board, ['B2-B7']);

      expect(calculator.calculate('B2-B7')).toEqual({
        pieceCode: PIECE_CODES[WHITE][ROOK],
        text: 'xb7',
        promotionCode: '',
      });
    });

    it('should use the file of departure for capture moves executed by pawns', () => {
      const board = {
        A6: { type: ROOK, color: WHITE, position: 'A6' },
        B7: { type: PAWN, color: BLACK, position: 'B7' },
      };
      const calculator = new NotationCalculator(board, ['B7-A6']);

      expect(calculator.calculate('B7-A6')).toEqual({
        pieceCode: PIECE_CODES[BLACK][PAWN],
        text: 'bxa6',
        promotionCode: '',
      });
    });

    it('should return the notation for a promotion move', () => {
      const board = { B7: { type: PAWN, color: WHITE, position: 'B7' } };
      const calculator = new NotationCalculator(board, ['B7-B8=Q']);

      expect(calculator.calculate('B7-B8=Q')).toEqual({
        pieceCode: '',
        text: 'b8=',
        promotionCode: PIECE_CODES[WHITE][QUEEN],
      });
    });

    it('should specify the column for an ambiguous move between 2 pieces', () => {
      const board = {
        A1: { type: ROOK, color: WHITE, position: 'A1' },
        H8: { type: ROOK, color: WHITE, position: 'H8' },
      };
      const calculator = new NotationCalculator(board, ['A1-A8', 'H8-A8']);

      expect(calculator.calculate('A1-A8')).toEqual({
        pieceCode: PIECE_CODES[WHITE][ROOK],
        text: 'aa8',
        promotionCode: '',
      });
    });

    it('should specify the column for an ambiguous move between 3 pieces', () => {
      const board = {
        C2: { type: KNIGHT, color: WHITE, position: 'C2' },
        E6: { type: KNIGHT, color: WHITE, position: 'E6' },
        F3: { type: KNIGHT, color: WHITE, position: 'F3' },
      };
      const calculator = new NotationCalculator(board, ['E6-D4', 'F3-D4']);

      expect(calculator.calculate('C2-D4')).toEqual({
        pieceCode: PIECE_CODES[WHITE][KNIGHT],
        text: 'cd4',
        promotionCode: '',
      });
    });

    it('should specify the row for an ambiguous move where the column is not enough', () => {
      const board = {
        A1: { type: ROOK, color: WHITE, position: 'A1' },
        A8: { type: ROOK, color: WHITE, position: 'A8' },
      };

      const calculator = new NotationCalculator(board, ['A1-A4', 'A8-A4']);
      expect(calculator.calculate('A1-A4')).toEqual({
        pieceCode: PIECE_CODES[WHITE][ROOK],
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
      const calculator = new NotationCalculator(board, ['A1-A4', 'A8-A4', 'D1-A4']);

      expect(calculator.calculate('A1-A4')).toEqual({
        pieceCode: PIECE_CODES[WHITE][QUEEN],
        text: 'a1a4',
        promotionCode: '',
      });
    });
  });
});
