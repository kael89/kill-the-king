/**
 * @param {number} columnId
 * @returns {string}
 */
export const columnIdToString = columnId => String.fromCharCode('A'.charCodeAt(0) + columnId);

/**
 * @param {number} rowId
 * @returns {string}
 */
export const rowIdToString = rowId => `${rowId + 1}`;

/**
 * @param {Coordinates}
 * @returns {string}
 */
export const coordinatesToPosition = ({ rowId, columnId }) =>
  `${columnIdToString(columnId)}${rowIdToString(rowId)}`;

/**
 *
 * @param {string} position
 * @returns {Coordinates}
 */
export const positionToCoordinates = position => {
  const rowId = parseInt(position.substr(-1)) - 1;
  const columnId = position.charCodeAt(0) - 'A'.charCodeAt(0);

  return {
    rowId,
    columnId,
  };
};
