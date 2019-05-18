/**
 * @typedef {Object.<string, Piece>} Board
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} rowId
 * @property {number} columnId
 */

/**
 * @typedef {Object} GetTreeInput
 * @property {string} type
 * @property {Board} board
 * @property {string} startingColor
 * @property {number} depth
 */

/**
 * @typedef {Object} Move
 * @property {string} source
 * @property {string} target
 */

/**
 * @typedef {Object} MoveData
 * @property {number} boardId
 * @property {string} move
 * @property {notation} string
 */

/**
 * @typedef {Object} Notation
 * @property {string} code
 * @property {string} text
 */

/**
 * @typedef {Object} Piece
 * @property {string} type
 * @property {string} position
 * @property {string} color
 */

/**
 * @typedef {Object} Settings
 * @property {string} defaultTheme
 * @property {number} maxMoves
 * @property {startingColor} string
 */
