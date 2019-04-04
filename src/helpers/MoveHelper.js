const MOVE_DELIMITER = '-';

/**
 * @param {string} move
 * @returns {Move}
 */
const parse = moveString => {
  const [source, target] = moveString.split(MOVE_DELIMITER);
  return { source, target };
};

/**
 *
 * @param {string} startRowId
 * @param {string} startColumnId
 * @param {string} endRowId
 * @param {string} endColumnId
 * @returns {string}
 */
const toString = ({ source, target }) => `${source}${MOVE_DELIMITER}${target}`;

export default {
  parse,
  toString,
};
