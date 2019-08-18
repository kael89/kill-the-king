import PropTypes from 'prop-types';

const NOTATION_TYPE = PropTypes.shape({
  pieceCode: PropTypes.string.isRequired,
  promotionCode: PropTypes.string,
  text: PropTypes.string.isRequired,
});

const PIECE_TYPE = PropTypes.shape({
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
});

export const PROP_TYPES = {
  board: PropTypes.objectOf(PIECE_TYPE),
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  notation: NOTATION_TYPE,
  piece: PIECE_TYPE,
  renderMoves: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number.isRequired,
      move: PropTypes.string.isRequired,
      notation: NOTATION_TYPE.isRequired,
    }),
  ),
  settings: PropTypes.shape({
    startingColor: PropTypes.string.isRequired,
    maxMoves: PropTypes.number.isRequired,
  }),
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  ),
};
