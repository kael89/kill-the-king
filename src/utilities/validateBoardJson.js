import { forOwn, has } from 'lodash';

import { isHashObject } from './generic';

/**
 * @param {string} json
 * @throws {Error}
 */
export const validateBoardJson = json => {
  let object;
  try {
    object = JSON.parse(json);
  } catch (error) {
    throw new Error(error.message);
  }

  if (!isHashObject(object)) {
    throw new Error('Input must be an object');
  }

  Object.entries(object).forEach(([key, value]) => {
    validatePosition(key);
    validatePiece(value);
    if (key !== value.position) {
      throw new Error(`Position '${key}' is different than piece position '${value.position}'`);
    }
  });
};

/**
 * @param {any} position
 * @throws {Error}
 */
const validatePosition = position => {
  if (!position.match(/^[A-H][1-8]$/i)) {
    throw new Error(`Invalid position '${position}'`);
  }
};

/**
 * @param {any} piece
 * @throws {Error}
 */
const validatePiece = piece => {
  if (!isHashObject(piece)) {
    throw new Error('Piece must be an object');
  }

  forOwn(piece, (value, prop) => {
    validatePieceProperty(prop, value);
  });

  const requiredProps = ['type', 'color', 'position'];
  requiredProps.forEach(prop => {
    if (!has(piece, prop)) {
      throw new Error(`Piece ${prop} is required`);
    }
  });
};

/**
 * @param {string} name
 * @param {any} value
 * @throws {Error}
 */
const validatePieceProperty = (name, value) => {
  switch (name) {
    case 'type':
      if (!['bishop', 'king', 'knight', 'pawn', 'queen', 'rook'].includes(value)) {
        throw new Error(`Invalid type '${value}'`);
      }
      break;
    case 'color':
      if (!['black', 'white'].includes(value)) {
        throw new Error(`Invalid color '${value}'`);
      }
      break;
    case 'position':
      validatePosition(value);
      break;
    default:
      throw new Error(`Invalid property '${name}'`);
  }
};
