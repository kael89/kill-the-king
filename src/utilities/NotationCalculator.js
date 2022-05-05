import { PIECE_CODES } from '../constants';
import { parseMoveString, promotionToPieceType } from './move';

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
    return PIECE_CODES[color][type];
  }

  getMovingPiece() {
    return this.getPieceAtPosition(this.source);
  }

  /**
   * @param {string} position
   * @returns {Piece}
   */
  getPieceAtPosition(position) {
    return this.board[position];
  }

  getText() {
    const suffix = this.promotion ? '=' : '';
    return `${this.getDisambiguatingText()}${this.target.toLowerCase()}${suffix}`;
  }

  getDisambiguatingText() {
    const ambiguousMoves = this.getIdenticalPieceMoves();
    if (ambiguousMoves.length === 0) {
      return '';
    }

    const { position } = this.getMovingPiece();
    const [column, row] = position;
    const { rows: ambiguousRows, columns: ambiguousColumns } =
      this.getRowsAndColumnsInMoves(ambiguousMoves);

    if (!ambiguousColumns.includes(column)) {
      return column.toLowerCase();
    }
    return !ambiguousRows.includes(row) ? row : position.toLowerCase();
  }

  getIdenticalPieceMoves() {
    const { type } = this.getMovingPiece();

    return this.availableMoves.filter(move => {
      const { source } = parseMoveString(move);
      const piece = this.getPieceAtPosition(source);

      const isIdenticalPiece = piece.type === type;
      const isDifferentPiece = source !== this.source;
      const hasSameTarget = parseMoveString(move).target === this.target;

      return isIdenticalPiece && isDifferentPiece && hasSameTarget;
    });
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
