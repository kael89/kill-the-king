import { APP_NAME } from '../../constants';
import { Color } from '../../enums';

/* Actions */
const SELECT_PIECE_TYPE = `${APP_NAME}/ui/TOGGLE_PIECE_TYPE`;
const TOGGLE_COLOR = `${APP_NAME}/ui/TOGGLE_COLOR`;
const TOGGLE_PIECE_SELECTOR = `${APP_NAME}/ui/TOGGLE_PIECE_SELECTOR`;

const defaultPieceSelector = {
  visible: false,
  piece: {
    type: '',
    color: Color.BLACK,
    position: '',
  },
};

/* Reducer */
export default function reducer(pieceSelector = defaultPieceSelector, action) {
  switch (action.type) {
    case SELECT_PIECE_TYPE: {
      return { ...pieceSelector, piece: { ...pieceSelector.piece, type: action.pieceType } };
    }
    case TOGGLE_COLOR: {
      const color = Color.opposite(pieceSelector.piece.color);
      return { ...pieceSelector, piece: { ...pieceSelector.piece, color } };
    }
    case TOGGLE_PIECE_SELECTOR: {
      return { visible: action.visible, piece: { ...pieceSelector.piece, ...action.piece } };
    }
    default: {
      return pieceSelector;
    }
  }
}

/* Action Creators */
export const deselectPieceType = () => ({
  pieceType: '',
  type: SELECT_PIECE_TYPE,
});

export const selectPieceType = pieceType => ({
  pieceType,
  type: SELECT_PIECE_TYPE,
});

export const toggleColor = () => ({
  type: TOGGLE_COLOR,
});

export const showPieceSelector = piece => ({
  piece,
  visible: true,
  type: TOGGLE_PIECE_SELECTOR,
});

export const hidePieceSelector = () => ({
  piece: {
    position: '',
  },
  visible: false,
  type: TOGGLE_PIECE_SELECTOR,
});
