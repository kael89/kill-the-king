interface Board {
  [position: string]: Piece;
}

type Color = 'black' | 'white';

type BoardCoordinate = number;

interface BoardCoordinates {
  rowId: BoardCoordinate;
  columnId: BoardCoordinate;
}

type DialogName = 'export' | 'import' | 'pieceChangeConfirmation';

type DraggableType = 'piece';

interface Move {
  source: string;
  target: string;
  promotion?: string;
}

interface RenderMove {
  boardId: number;
  move: string;
  notation: Notation;
}

interface Notation {
  pieceCode: string;
  text: string;
  promotionCode?: string;
}

interface Piece {
  type: PieceType;
  position: string;
  color: Color;
}

type PieceType = 'bishop' | 'king' | 'knight' | 'pawn' | 'queen' | 'rook';

interface Settings {
  theme: string;
  maxMoves: number;
  startingColor: Color;
}
