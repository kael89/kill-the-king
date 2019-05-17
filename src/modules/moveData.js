import { getNotation } from './notation';

export const getMoveData = (chessTree, board, boardId) => {
  if (chessTree === null) {
    return [];
  }

  return Object.keys(chessTree).map(move => ({
    boardId,
    move,
    notation: getNotation(board, move),
  }));
};
