import fetch from 'cross-fetch';
import queryString from 'query-string';

const GET_TREE_RESOURCE = 'get-tree';

/**
 * @enum {TreeType}
 */
const TREE_TYPE = {
  GAME: 'game',
  FORCED_MATE: 'forcedMate',
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
  const params = queryString.stringify({
    type,
    board: JSON.stringify(board),
    startingColor,
    depth,
  });
  const url = `${process.env.REACT_APP_API_URL}/${GET_TREE_RESOURCE}?${params}`;

  return fetch(url);
};

export const getGameTree = async params => getTree({ ...params, type: TREE_TYPE.GAME });

export const getForcedMateTree = async params => getTree({ ...params, type: TREE_TYPE.FORCED_MATE });
