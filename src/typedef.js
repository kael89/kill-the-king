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
 * @typedef {Object} Move
 * @property {string} source
 * @property {string} target
 */

/**
 * @typedef {Object} MoveData
 * @property {number} boardId
 * @property {string} move
 * @property {Notation} string
 */

/**
 * @typedef {Object} Notation
 * @property {string} pieceCode
 * @property {string} promotionCode
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

/**
 * @typedef {('dark'|'light')} ThemeName
 */

/**
 * @typedef {('game'|'forcedMate')} TreeType
 */
