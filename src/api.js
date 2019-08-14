import fetch from 'cross-fetch';

export const RESOURCES = {
  GET_TREE: 'get-tree',
};

export const maxMovesToDepth = maxMoves => maxMoves * 2;

/**
 * @param {{ type: string, board: Board, startingColor: Color, depth: number }} params
 */
const getTree = async ({ type, board, startingColor, depth }) => {
  const params = new URLSearchParams({
    type,
    board: JSON.stringify(board),
    startingColor,
    depth,
  }).toString();
  const url = `${process.env.REACT_APP_API_URL}/${RESOURCES.GET_TREE}?${params}`;

  return fetch(url);
};

export const getGameTree = async params => getTree({ ...params, type: 'game' });

export const getForcedMateTree = async params => getTree({ ...params, type: 'forcedMate' });
