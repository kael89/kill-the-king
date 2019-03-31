import fetch from 'cross-fetch';
import queryString from 'query-string';

import { ApiResource, ChessTree } from './enums';

const getTree = async ({ type, board, startingColor, depth }) => {
  const params = queryString.stringify({
    type,
    board: JSON.stringify(board),
    startingColor,
    depth,
  });

  return fetch(`${process.env.REACT_APP_API_URL}/${ApiResource.GET_TREE}?${params}`);
};

export const getGameTree = async params => getTree({ ...params, type: ChessTree.GAME });

export const getForcedMateTree = async params => getTree({ ...params, type: ChessTree.FORCED_MATE });
