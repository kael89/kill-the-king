const MOVE_DELIMITER = '-';

/**
 * @param {string} move
 * @returns {Move}
 */
const parse = moveString => {
  const [source, target] = moveString.split(MOVE_DELIMITER);
  return { source, target };
};

export default {
  parse,
};
