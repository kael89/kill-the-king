import { get } from 'lodash';

import { NotationCalculator } from '../utilities/NotationCalculator';
import { getBoardById, getCurrentBoardId } from './board/selectors';

export const getPlayedMovesByBoardId = (state, boardId) => {
  const playedMovesCount = boardId - state.board.resetBoardId;
  return state.moveHistory.slice(0, playedMovesCount).map(renderMove => renderMove.move);
};

const getChessTreeByBoardId = (state, boardId) => {
  const {
    results: { data },
  } = state;
  const playedMoves = getPlayedMovesByBoardId(state, boardId);

  return get(data, playedMoves, data);
};

export const getRenderMovesByBoardId = (state, boardId) => {
  const chessTree = getChessTreeByBoardId(state, boardId);
  if (chessTree === null) {
    return [];
  }

  const board = getBoardById(state, boardId);
  const availableMoves = Object.keys(chessTree);

  return availableMoves.map(move => ({
    boardId,
    move,
    notation: new NotationCalculator(board, availableMoves).calculate(move),
  }));
};

export const getRenderMovesForCurrentBoard = state =>
  getRenderMovesByBoardId(state, getCurrentBoardId(state));

export const getRenderMovesForResetBoard = state =>
  getRenderMovesByBoardId(state, state.board.resetBoardId);
