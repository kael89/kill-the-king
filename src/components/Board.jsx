import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PieceCodes } from '../constants';
import { PositionHelper } from '../helpers';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';
import PieceSelector from './PieceSelector';
import Square, { SQUARE_SIZE } from './Square';

const DEFAULT_SELECTED_POSITION = '';
const BOARD_DIMENSION = 8;
const RULER_SIZE = 20;
const BOARD_SIZE = SQUARE_SIZE * BOARD_DIMENSION;

const rowIds = [...Array(BOARD_DIMENSION).keys()].reverse();
const columnIds = [...Array(BOARD_DIMENSION).keys()];

const styles = theme => ({
  board: {
    position: 'relative',
    width: `${BOARD_SIZE}px`,
    height: `${BOARD_SIZE}px`,
    color: theme.chessColor.black,
  },
  ruler: {
    color: theme.chessColor.black,
  },
  rowRuler: {
    position: 'absolute',
    left: `${-1 * RULER_SIZE}px`,
    width: `${RULER_SIZE}px`,
    lineHeight: `${SQUARE_SIZE}px`,
  },
  rowRulerItem: {
    height: `${SQUARE_SIZE}px`,
    verticalAlign: 'middle',
  },
  columnRuler: {
    width: `${SQUARE_SIZE}px`,
    textAlign: 'center',
  },
});

const BasicRowRuler = ({ classes }) => (
  <Grid container direction="column" className={classes.rowRuler}>
    {rowIds.map(rowId => (
      <Grid key={rowId} className={classes.rowRulerItem}>
        {PositionHelper.rowIdToString(rowId)}
      </Grid>
    ))}
  </Grid>
);

BasicRowRuler.propTypes = {
  classes: propTypes.classes.isRequired,
};

const RowRuler = withThemeAndStyles(BasicRowRuler, styles);

const BasicColumnRuler = ({ classes }) => (
  <Grid container>
    {columnIds.map(columnId => (
      <Grid key={columnId} className={classnames(classes.ruler, classes.columnRuler)}>
        {PositionHelper.columnIdToString(columnId)}
      </Grid>
    ))}
  </Grid>
);

BasicColumnRuler.propTypes = {
  classes: propTypes.classes.isRequired,
};

const ColumnRuler = withThemeAndStyles(BasicColumnRuler, styles);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPosition: DEFAULT_SELECTED_POSITION,
      selectorOpen: false,
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSelectorClose = this.handleSelectorClose.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  getBoard() {
    const { board, hint, showHint } = this.props;
    return showHint ? hint : board;
  }

  getPieceCodeAt(position) {
    const board = this.getBoard();
    if (!board[position]) {
      return '';
    }

    const { type, color } = board[position];
    return PieceCodes[color][type];
  }

  getPieceAt(position) {
    const { board } = this.props;
    return board[position] || null;
  }

  handleConfirm({ type, color }) {
    const { addPiece, removePiece } = this.props;
    const { selectedPosition } = this.state;

    if (type && color) {
      addPiece(type, color, selectedPosition);
    } else {
      removePiece(selectedPosition);
    }
  }

  handleSelectorClose() {
    this.setState({
      selectedPosition: DEFAULT_SELECTED_POSITION,
      selectorOpen: false,
    });
  }

  handleSquareClick(square) {
    this.setState({
      selectedPosition: square,
      selectorOpen: true,
    });
  }

  render() {
    const { selectedPosition, selectorOpen } = this.state;
    const { classes, showHint, theme } = this.props;

    return (
      <Grid container className={classes.board}>
        <RowRuler />
        {rowIds.map(rowId => (
          <Grid key={rowId} item container>
            {columnIds.map(columnId => {
              const position = PositionHelper.getPositionName(rowId, columnId);
              const pieceCode = this.getPieceCodeAt(position);
              const pieceColor = showHint && pieceCode ? theme.piece.hintColor : '';

              return (
                <Square
                  key={position}
                  rowId={rowId}
                  columnId={columnId}
                  pieceCode={pieceCode}
                  pieceColor={pieceColor}
                  selected={selectedPosition === position}
                  onClick={() => this.handleSquareClick(position)}
                />
              );
            })}
          </Grid>
        ))}
        <ColumnRuler />

        <PieceSelector
          key={selectedPosition}
          open={selectorOpen}
          selectedPiece={this.getPieceAt(selectedPosition)}
          onClose={this.handleSelectorClose}
          onConfirm={this.handleConfirm}
        />
      </Grid>
    );
  }
}

Board.propTypes = {
  addPiece: PropTypes.func.isRequired,
  board: propTypes.board.isRequired,
  classes: propTypes.classes.isRequired,
  hint: propTypes.board.isRequired,
  removePiece: PropTypes.func.isRequired,
  showHint: PropTypes.bool.isRequired,
  theme: propTypes.theme.isRequired,
};

export default withThemeAndStyles(Board, styles);
