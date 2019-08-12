export const ADD_MOVE = 'ADD_MOVE';
export const CLEAR_MOVE_HISTORY = 'CLEAR_MOVE_HISTORY';
export const RESTORE_MOVE = 'RESTORE_MOVE';

export const addMove = moveDatum => ({
  moveDatum,
  type: ADD_MOVE,
});

export const clearMoveHistory = () => ({
  type: CLEAR_MOVE_HISTORY,
});

export const restoreMove = index => ({
  index,
  type: RESTORE_MOVE,
});
