import { APP_NAME } from '../../constants';

/* Actions */
const ADD_MOVE = `${APP_NAME}/moveHistory/ADD_MOVE`;
const RESTORE_MOVE = `${APP_NAME}/moveHistory/RESTORE_MOVE`;

/* Reducer */
export default function reducer(moveHistory = [], action) {
  switch (action.type) {
    case ADD_MOVE:
      return [...moveHistory, { move: action.move, boardId: action.boardId }];
    case RESTORE_MOVE:
      return moveHistory.slice(0, action.index + 1);
    default:
      return moveHistory;
  }
}

/* Action Creators */
export const addMove = (move, boardId) => ({
  move,
  boardId,
  type: ADD_MOVE,
});

export const restoreMove = index => ({
  index,
  type: RESTORE_MOVE,
});
