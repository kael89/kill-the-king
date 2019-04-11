/**
 * @param {string} move
 * @returns {Move}
 */
const parse = moveString => {
  const regexp = /([A-H][1-8])-([A-H][1-8])(=([bnqr]))?/i;
  const [, source, target, , promotion] = moveString.match(regexp);

  return { source, target, promotion: promotion || '' };
};

/**
 *
 * @param {string} startRowId
 * @param {string} startColumnId
 * @param {string} endRowId
 * @param {string} endColumnId
 * @returns {string}
 */
const toString = ({ source, target, promotion }) => {
  let result = `${source}-${target}`;
  if (promotion) {
    result += `=${promotion}`;
  }

  return result;
};

export default {
  parse,
  toString,
};
