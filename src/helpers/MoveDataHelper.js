import { get as getProperty } from 'lodash';

import { NotationHelper } from '.';

const get = (data, moveHistory, board, boardId) => {
  if (data === null) {
    return null;
  }

  const availableMoves = Object.keys(getProperty(data, moveHistory.map(moveData => moveData.move), data));

  return availableMoves.map(move => ({
    boardId,
    move,
    notation: NotationHelper.getNotation(board, move),
  }));
};

export default {
  get,
};
