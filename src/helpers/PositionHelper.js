/**
 * @param {number} columnId
 * @returns {string}
 */
const columnIdToString = columnId => String.fromCharCode('A'.charCodeAt(0) + columnId);

/**
 * @param {number} rowId
 * @returns {string}
 */
const rowIdToString = rowId => rowId + 1;

/**
 * @param {number} rowId
 * @param {number} columnId
 * @returns {string}
 */
const getPositionName = (rowId, columnId) => `${columnIdToString(columnId)}${rowIdToString(rowId)}`;

/**
 *
 * @param {string} position
 * @returns {Position}
 */
const positionToCoordinates = position => {
  const rowId = position.substr(-1) - 1;
  const columnId = position.charCodeAt(0) - 'A'.charCodeAt(0);

  return {
    rowId,
    columnId,
  };
};

export default {
  columnIdToString,
  getPositionName,
  positionToCoordinates,
  rowIdToString,
};
