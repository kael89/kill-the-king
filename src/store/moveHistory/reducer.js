import { ADD_MOVE, CLEAR_MOVE_HISTORY, RESTORE_MOVE } from './actions';

export default function reducer(moveHistory = [], action) {
  switch (action.type) {
    case ADD_MOVE:
      return [...moveHistory, action.moveDatum];
    case CLEAR_MOVE_HISTORY: {
      return [];
    }
    case RESTORE_MOVE:
      return moveHistory.slice(0, action.index + 1);
    default:
      return moveHistory;
  }
}
