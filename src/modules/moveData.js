import { getMoveNotation } from './notation/notation';

export const getMoveData = (chessTree, board, boardId) => {
  if (chessTree === null) {
    return [];
  }

  const availableMoves = Object.keys(chessTree);

  return availableMoves.map(move => ({
    boardId,
    move,
    notation: getMoveNotation(board, move, availableMoves),
  }));
};
