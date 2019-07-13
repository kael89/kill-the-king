import { forOwn, has } from 'lodash';

import { isHashObject } from '../../utils';

export class BoardJsonError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BoardJsonError';
  }
}

/**
 * @param {string} json
 * @throws {BoardJsonError}
 */
export const validateBoardJson = json => {
  let object;
  try {
    object = JSON.parse(json);
  } catch (error) {
    throw new BoardJsonError(error.message);
  }

  if (!isHashObject(object)) {
    throw new BoardJsonError('Input must be an object');
  }

  Object.entries(object).forEach(([key, value]) => {
    validatePosition(key);
    validatePiece(value);
    if (key !== value.position) {
      throw new BoardJsonError(
        `Position '${key}' is different than piece position '${value.position}'`,
      );
    }
  });
};

/**
 * @param {*} position
 * @throws {BoardJsonError}
 */
const validatePosition = position => {
  if (!position.match(/^[A-H][1-8]$/i)) {
    throw new BoardJsonError(`Invalid position '${position}'`);
  }
};

/**
 * @param {*} piece
 * @param {string} position
 * @throws {BoardJsonError}
 */
const validatePiece = piece => {
  if (!isHashObject(piece)) {
    throw new BoardJsonError('Piece must be an object');
  }

  forOwn(piece, (value, prop) => {
    validatePieceProperty(prop, value);
  });

  const requiredProps = ['type', 'color', 'position'];
  requiredProps.forEach(prop => {
    if (!has(piece, prop)) {
      throw new BoardJsonError(`Piece ${prop} is required`);
    }
  });
};

/**
 * @param {string} name
 * @param {*} piece
 * @throws {BoardJsonError}
 */
const validatePieceProperty = (name, value) => {
  switch (name) {
    case 'type':
      if (!['bishop', 'king', 'knight', 'pawn', 'queen', 'rook'].includes(value)) {
        throw new BoardJsonError(`Invalid type '${value}'`);
      }
      break;
    case 'color':
      if (!['black', 'white'].includes(value)) {
        throw new BoardJsonError(`Invalid color '${value}'`);
      }
      break;
    case 'position':
      validatePosition(value);
      break;
    default:
      throw new BoardJsonError(`Invalid property '${name}'`);
  }
};
