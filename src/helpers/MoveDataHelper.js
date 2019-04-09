import { NotationHelper } from '.';

const get = (chessTree, board, boardId) => {
  if (chessTree === null) {
    return [];
  }

  return Object.keys(chessTree).map(move => ({
    boardId,
    move,
    notation: NotationHelper.getNotation(board, move),
  }));
};

export default {
  get,
};
