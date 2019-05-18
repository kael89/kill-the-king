import { BOARD_SIZE } from './constants';
import { Color, PieceType } from './enums';
import PositionHelper from './helpers/PositionHelper';

const { BLACK, WHITE } = Color;
const { PAWN } = PieceType;
const { positionToCoordinates } = PositionHelper;

// TODO generalize?
// TODO if not generalize, add array of supported props?
// TODO use lodash?
const mapPiecesToProperty = (pieces, property) => {
  const map = {};

  pieces.forEach(piece => {
    const key = piece[property];
    if (!map[key]) {
      map[key] = [];
    }

    map[key].push({ ...piece });
  });
};

// TODO move to Board helper file
/*** START ***/
const mapPiecesToType = pieces => mapPiecesToProperty(pieces, 'type');

const mapPiecesToColor = pieces => mapPiecesToProperty(pieces, 'color');

// TODO beware, sorts in place!
const sortPiecesByColumn = pieces => pieces.sort();
/*** END ***/

// const mapPiecesToColor = pieces => ;

/**
 * A pawn cannot be found in
 * 1. The first row in the direction of its movement (it starts from the second row)
 * 2. The last row in the direction of its movement (it would have been promoted)
 *
 * @param {Piece[]} pieces
 * @returns {string}
 */
const validatePawnRow = pieces => {
  for (let i = 0; i < pieces.length; i++) {
    const { color, position, type } = pieces[i];
    if (type !== PAWN) {
      continue;
    }

    const { rowId } = positionToCoordinates(position);
    const rowString = rowId + 1;
    // TODO 7 magic number?
    if ((color === WHITE && rowId === 0) || (color === BLACK && rowId === BOARD_SIZE - 1)) {
      return `A ${color} pawn cannot appear at row number ${rowString}`;
    }
    if ((color === WHITE && rowId === BOARD_SIZE - 1) || (color === BLACK && rowId === 0)) {
      return `A ${color} pawn has to be promoted at row number ${rowString}`;
    }
  }

  return '';
};

/**
 * A pawn can end up in the same column as another pawn of the same color,
 * only if it has captured a piece. This method compares the number of
 * possible captured pieces with the number of same color pawns in the same
 * color to determine if such a scenario is valid.
 *
 *
 * @param {Piece[]} pieces
 * @returns {string}
 */
const validatePawnColumn = pieces => {
  const piecesByColor = mapPiecesToColor(pieces);
  const capturedPiecesLeft = {
    BLACK: 16 - piecesByBLACK.length, // TODO 16 magic number?
    WHITE: 16 - piecesByWHITE.length,
  };

  const pawns = mapPiecesToType(pieces).pawn;
  const pawnsByColor = mapPiecesToColor(pawns);
  for (color in pawnsByColor) {
    // TODO !!! NO NEED TO SORT HERE? !!!

    currentPawnsByColor = pawnsByColor[color];
    sortPiecesByColumn(currentPawnsByColor); // TODO in place??
    for (let i = 1; i < currentPawnsByColor.length; i++) {
      const currentColumn = positionToCoordinates(currentPawnsByColor[i].position).column;
      const previousColumn = positionToCoordinates(currentPawnsByColor[i - 1].position).column;

      if (currentColumn === previousColumn) {
        capturedPiecesLeft[color]--;
        if (capturedPiecesLeft[color] < 1) {
          // TODO proper error message here
          return 'ERRORR';
        }
      }
    }
  }

  return '';
};

/**
 * @param {Board}
 * @returns {string} An error if the board is invalid, otherwise an empty string
 */
const validateBoard = board => {
  const validators = [validatePawnRow];
  const pieces = Object.values(board);

  let error = '';
  for (let i = 0; i < validators.length; i++) {
    error = validators[i](pieces);
    if (error) {
      break;
    }
  }

  return error;
};

export default validateBoard;
