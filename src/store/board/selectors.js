import { last } from 'lodash';

export const getBoardById = ({ board }, boardId) => board.history[boardId];

export const getCurrentBoardId = ({ board }) => board.history.length - 1;

export const getCurrentBoard = ({ board }) => last(board.history);
