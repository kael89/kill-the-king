import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DraggablePiece from '../containers/DraggablePiece';
import { COLOR } from '../modules/chess';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const { BLACK, WHITE } = COLOR;

export const SQUARE_SIZE = 70;

const getSquareColor = (rowId, columnId) => ((rowId + columnId) % 2 === 0 ? BLACK : WHITE);

const styles = theme => ({
  container: {
    width: `${SQUARE_SIZE}px`,
    height: `${SQUARE_SIZE}px`,
    textAlign: 'center',
  },
  black: {
    background: theme.chessColor.black,
  },
  white: {
    background: theme.chessColor.white,
  },
  selected: {
    border: `5px solid ${theme.square.selected}`,
  },
});

class Square extends React.Component {
  shouldComponentUpdate(nextProps) {
    const updatableProps = ['hinted', 'piece', 'selected', 'theme'];

    for (let i = 0; i < updatableProps.length; i++) {
      const prop = updatableProps[i];
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props[prop] !== nextProps[prop]) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { classes, rowId, columnId, hinted, piece, position, selected } = this.props;
    const colorClass = getSquareColor(rowId, columnId) === BLACK ? 'black' : 'white';

    return (
      <div
        data-position={position}
        className={classnames(classes.container, classes[colorClass], { [classes.selected]: selected })}
      >
        {piece ? <DraggablePiece hinted={hinted} piece={piece} /> : null}
      </div>
    );
  }
}

Square.propTypes = {
  classes: propTypes.classes.isRequired,
  columnId: PropTypes.number.isRequired,
  hinted: PropTypes.bool.isRequired,
  piece: propTypes.piece,
  position: PropTypes.string,
  rowId: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

Square.defaultProps = {
  piece: null,
  position: '',
  selected: false,
};

export default withThemeAndStyles(Square, styles);
