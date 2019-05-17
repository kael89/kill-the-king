import { getNotation } from '../modules/notation';

const get = (chessTree, board, boardId) => {
  if (chessTree === null) {
    return [];
  }

  return Object.keys(chessTree).map(move => ({
    boardId,
    move,
    notation: getNotation(board, move),
  }));
};

export default {
  get,
};
