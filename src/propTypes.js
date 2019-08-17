/**
 * Common Prop Types across components
 */
import PropTypes from 'prop-types';

const sharedPropTypes = {
  piece: PropTypes.shape({
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }),
};

export default {
  board: PropTypes.objectOf(sharedPropTypes.piece),
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  renderMoves: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number.isRequired,
      move: PropTypes.string.isRequired,
      notation: PropTypes.shape({
        pieceCode: PropTypes.string.isRequired,
        promotionCode: PropTypes.string,
        text: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ),
  notation: PropTypes.shape({
    pieceCode: PropTypes.string.isRequired,
    promotionCode: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  piece: sharedPropTypes.piece,
  settings: PropTypes.shape({
    startingColor: PropTypes.string.isRequired,
    maxMoves: PropTypes.number.isRequired,
  }),
  theme: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  ),
};
