/**
 * @param {string} moveString
 * @returns {Move}
 */
export const stringToMove = moveString => {
  const regexp = /([A-H][1-8])-([A-H][1-8])(=([bnqr]))?/i;
  const [, source, target, , promotion] = moveString.match(regexp);

  return { source, target, promotion: promotion || '' };
};

/**
 *
 * @param {string} source
 * @param {string} target
 * @param {string} promotion
 * @returns {string}
 */
export const moveToString = ({ source, target, promotion }) => {
  let result = `${source}-${target}`;
  if (promotion) {
    result += `=${promotion}`;
  }

  return result;
};
