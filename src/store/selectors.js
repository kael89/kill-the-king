import { get } from 'lodash';

import { getMoveNotation } from '../modules/notation/notation';
import { getBoardById, getCurrentBoardId } from './board/selectors';

const getCurrentChessTree = state => {
  const {
    moveHistory,
    results: { data },
  } = state;
  const playedMoves = moveHistory.map(moveDatum => moveDatum.move);

  return get(data, playedMoves, data);
};

export const getMoveDataByBoardId = (state, boardId) => {
  const chessTree = getCurrentChessTree(state);
  if (chessTree === null) {
    return [];
  }

  const board = getBoardById(state, boardId);
  const availableMoves = Object.keys(chessTree);

  return availableMoves.map(move => ({
    boardId,
    move,
    notation: getMoveNotation(board, move, availableMoves),
  }));
};

export const getMoveDataForCurrentBoard = state =>
  getMoveDataByBoardId(state, getCurrentBoardId(state));

export const getMoveDataForResetBoard = state =>
  getMoveDataByBoardId(state, state.board.resetBoardId);
