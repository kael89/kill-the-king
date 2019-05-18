/**
 * @typedef {Object.<string, Piece>} Board
 */

/**
 * @typedef {('black'|'white')} Color
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
 * @property {Color} startingColor
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
 * @property {PieceType} type
 * @property {string} position
 * @property {Color} color
 */

/**
 * @typedef {('bishop'|'king'|'knight'|'pawn'|'queen'|'rook')} PieceType
 */

/**
 * @typedef {Object} Settings
 * @property {string} defaultTheme
 * @property {number} maxMoves
 * @property {Color} startingColor
 */
