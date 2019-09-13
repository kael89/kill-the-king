import { PIECE_CODES } from '../constants';
import { PIECE_TYPE } from '../enums';
import { parseMoveString, promotionToPieceType } from './move';

const { PAWN } = PIECE_TYPE;

export class NotationCalculator {
  /**
   * @public
   *
   * @param {Board} board
   * @param {string[]} availableMoves
   */
  constructor(board, availableMoves) {
    this.board = board;
    this.availableMoves = availableMoves;
  }

  /**
   * @public
   *
   * @param {string} move
   * @returns {Notation}
   */
  calculate(move) {
    this.move = move;
    const { source, target, promotion } = parseMoveString(move);
    this.source = source;
    this.target = target;
    this.promotion = promotion;

    return {
      pieceCode: this.getPieceCode(),
      text: this.getText(),
      promotionCode: this.getPromotionCode(),
    };
  }

  getPieceCode() {
    const { type, color } = this.getMovingPiece();
    const shouldUsePieceCode = type !== PAWN || this.isCaptureMove();

    return shouldUsePieceCode ? PIECE_CODES[color][type] : '';
  }

  getMovingPiece() {
    return this.getPieceAt(this.source);
  }

  getPieceAt(position) {
    return this.board[position];
  }

  isCaptureMove() {
    return !!this.getPieceAt([this.target]);
  }

  getText() {
    const captureSymbol = this.isCaptureMove() ? 'x' : '';
    const suffix = this.promotion ? '=' : '';

    return [this.getMoveOrigin(), captureSymbol, this.target, suffix].join('').toLowerCase();
  }

  getMoveOrigin() {
    const { type, position } = this.getMovingPiece();

    if (type === PAWN) {
      const column = position[0];
      return this.isCaptureMove() ? column : '';
    }

    const ambiguousMoves = this.getIdenticalPieceMoves();
    return ambiguousMoves.length > 0 ? this.getDisambiguatingText(ambiguousMoves) : '';
  }

  getIdenticalPieceMoves() {
    const { type } = this.getMovingPiece();

    return this.availableMoves.filter(move => {
      const { source } = parseMoveString(move);
      const piece = this.getPieceAt(source);

      const isIdenticalPiece = piece.type === type;
      const isDifferentPiece = source !== this.source;
      const hasSameTarget = parseMoveString(move).target === this.target;

      return isIdenticalPiece && isDifferentPiece && hasSameTarget;
    });
  }

  getDisambiguatingText(ambiguousMoves) {
    const { position } = this.getMovingPiece();
    const [column, row] = position;
    const { rows: ambiguousRows, columns: ambiguousColumns } = this.getRowsAndColumnsInMoves(
      ambiguousMoves,
    );

    if (!ambiguousColumns.includes(column)) {
      return column;
    }
    return !ambiguousRows.includes(row) ? row : position;
  }

  getRowsAndColumnsInMoves = moves =>
    moves.reduce(
      (result, move) => {
        result.columns.push(move[0]);
        result.rows.push(move[1]);

        return result;
      },
      { rows: [], columns: [] },
    );

  getPromotionCode() {
    const { color } = this.getMovingPiece();
    const pieceType = promotionToPieceType(this.promotion);

    return PIECE_CODES[color][pieceType] || '';
  }
}
