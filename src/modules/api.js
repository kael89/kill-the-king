import fetch from 'cross-fetch';

const GET_TREE = 'get-tree';

export const RESOURCES = {
  GET_TREE,
};

/** @type {TreeType} */
const GAME = 'game';
/** @type {TreeType} */
const FORCED_MATE = 'forcedMate';

/**
 * @enum {TreeType}
 */
const TREE_TYPE = {
  GAME,
  FORCED_MATE,
};

/**
 * @param {number} maxMoves
 * @returns {number}
 */
export const maxMovesToDepth = maxMoves => maxMoves * 2;

/**
 * @param {Object} params
 * @param {TreeType} params.type
 * @param {Board} params.board
 * @param {Color} params.startingColor
 * @param {number} params.depth
 */
const getTree = async ({ type, board, startingColor, depth }) => {
  const params = new URLSearchParams({
    type,
    board: JSON.stringify(board),
    startingColor,
    depth,
  }).toString();
  const url = `${process.env.REACT_APP_API_URL}/${GET_TREE}?${params}`;

  return fetch(url);
};

export const getGameTree = async params => getTree({ ...params, type: TREE_TYPE.GAME });

export const getForcedMateTree = async params =>
  getTree({ ...params, type: TREE_TYPE.FORCED_MATE });
