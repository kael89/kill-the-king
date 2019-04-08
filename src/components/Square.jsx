import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PieceCodes } from '../constants';
import DraggablePieceContainer from '../containers/DraggablePieceContainer';
import { Color } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

export const SQUARE_SIZE = 70;

const getSquareColor = (rowId, columnId) => ((rowId + columnId) % 2 === 0 ? Color.BLACK : Color.WHITE);

const styles = theme => ({
  container: {
    width: `${SQUARE_SIZE}px`,
    height: `${SQUARE_SIZE}px`,
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
      if (this.props[prop] !== nextProps[prop]) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { classes, rowId, columnId, hinted, onClick, piece, position, selected } = this.props;
    const colorClass = getSquareColor(rowId, columnId) === Color.BLACK ? 'black' : 'white';
    const pieceCode = piece ? PieceCodes[piece.color][piece.type] : '';

    return (
      <Grid
        onClick={() => onClick({ ...piece, position })}
        className={classnames(classes.container, classes[colorClass], { [classes.selected]: selected })}
      >
        <DraggablePieceContainer rowId={rowId} columnId={columnId} hinted={hinted}>
          {pieceCode}
        </DraggablePieceContainer>
      </Grid>
    );
  }
}

Square.propTypes = {
  classes: propTypes.classes.isRequired,
  columnId: PropTypes.number.isRequired,
  hinted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  piece: propTypes.piece.isRequired,
  position: PropTypes.string.isRequired,
  rowId: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

Square.defaultProps = {
  selected: false,
};

export default withThemeAndStyles(Square, styles);
