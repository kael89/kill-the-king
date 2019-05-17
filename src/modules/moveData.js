import { getMoveNotation } from './notation';

export const getMoveData = (chessTree, board, boardId) => {
  if (chessTree === null) {
    return [];
  }

  return Object.keys(chessTree).map(move => ({
    boardId,
    move,
    notation: getMoveNotation(board, move),
  }));
};
