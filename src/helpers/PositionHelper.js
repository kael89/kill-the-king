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

export default {
  columnIdToString,
  rowIdToString,
  getPositionName,
};
