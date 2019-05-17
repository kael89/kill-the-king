/**
 * @param {number} columnId
 * @returns {string}
 */
export const columnIdToString = columnId => String.fromCharCode('A'.charCodeAt(0) + columnId);

/**
 * @param {number} rowId
 * @returns {string}
 */
export const rowIdToString = rowId => rowId + 1;

/**
 * @param {number} rowId
 * @param {number} columnId
 * @returns {string}
 */
export const getPositionName = (rowId, columnId) => `${columnIdToString(columnId)}${rowIdToString(rowId)}`;

/**
 *
 * @param {string} position
 * @returns {Position}
 */
export const positionToCoordinates = position => {
  const rowId = position.substr(-1) - 1;
  const columnId = position.charCodeAt(0) - 'A'.charCodeAt(0);

  return {
    rowId,
    columnId,
  };
};
