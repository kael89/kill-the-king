import { Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PositionHelper } from '../helpers';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';
import DroppableSquare from './DroppableSquare';
import { SQUARE_SIZE } from './Square';

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

const Board = ({ board, classes, hint, showHint }) => {
  const finalBoard = showHint ? hint : board;

  return (
    <Grid container className={classes.board}>
      <RowRuler />
      {rowIds.map(rowId => (
        <Grid key={rowId} item container>
          {columnIds.map(columnId => {
            const position = PositionHelper.getPositionName(rowId, columnId);

            return (
              <DroppableSquare
                key={`${rowId}-${columnId}`}
                rowId={rowId}
                columnId={columnId}
                piece={finalBoard[position] || null}
                position={position}
              />
            );
          })}
        </Grid>
      ))}
      <ColumnRuler />
    </Grid>
  );
};

Board.propTypes = {
  board: propTypes.board.isRequired,
  classes: propTypes.classes.isRequired,
  hint: propTypes.board.isRequired,
  showHint: PropTypes.bool.isRequired,
};

export default withThemeAndStyles(Board, styles);
