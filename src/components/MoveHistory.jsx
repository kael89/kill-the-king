import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import chunk from 'lodash/chunk';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { COLOR } from '../modules/chess';
import propTypes from '../propTypes';
import { revertBoard } from '../store/board/actions';
import { restoreMove } from '../store/moveHistory/actions';
import { withThemeAndStyles } from '../utils';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';

const { BLACK } = COLOR;

const sharedPropTypes = {
  moveData: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number.isRequired,
      notation: propTypes.notation.isRequired,
    }),
  ),
  onMoveSelect: PropTypes.func,
};

const styles = {
  container: {
    width: '100%',
  },
  row: {
    width: '100%',
  },
  rowNumber: {
    width: '20%',
  },
  move: {
    width: '40%',
    textAlign: 'center',
  },
};

const BaseMoveRow = ({ classes, id, moveData, onMoveSelect }) => (
  <TableRow className={classes.row}>
    <TableCell className={classes.rowNumber}>{id + 1}.</TableCell>
    {moveData.map((moveDatum, index) => {
      const { boardId } = moveDatum;
      const moveId = id * 2 + index;

      return (
        <TableCell key={boardId} className={classes.move}>
          {boardId === -1 ? (
            ''
          ) : (
            <MoveButton onClick={() => onMoveSelect(moveId, boardId)} {...moveDatum} />
          )}
        </TableCell>
      );
    })}
  </TableRow>
);

BaseMoveRow.propTypes = {
  id: PropTypes.number.isRequired,
  classes: propTypes.classes.isRequired,
  moveData: sharedPropTypes.moveData.isRequired,
  onMoveSelect: sharedPropTypes.onMoveSelect.isRequired,
};

const MoveRow = withThemeAndStyles(BaseMoveRow, styles);

const sanitizeMoveData = (moveData, startingColor) => {
  const emptyMove = { boardId: -1, move: '', notation: { pieceCode: '', text: '' } };

  const result = [...moveData];
  if (result.length > 0 && startingColor === BLACK) {
    result.unshift(emptyMove);
  }
  if (result.length % 2 === 1) {
    // Make result length even for consistent line width
    result.push(emptyMove);
  }

  return result;
};

const MoveHistory = ({ classes, moveData, startingColor, onMoveSelect }) => {
  const sanitizedMoveData = sanitizeMoveData(moveData, startingColor);

  return (
    <ExpansionPanel summary="Move History">
      {
        <Table>
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell className={classes.rowNumber}>No.</TableCell>
              <TableCell className={classes.move}>White</TableCell>
              <TableCell className={classes.move}>Black</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chunk(sanitizedMoveData, 2).map((movePair, rowId) => (
              <MoveRow
                key={movePair[0].boardId}
                id={rowId}
                moveData={movePair}
                onMoveSelect={onMoveSelect}
              />
            ))}
          </TableBody>
        </Table>
      }
    </ExpansionPanel>
  );
};

MoveHistory.propTypes = {
  classes: propTypes.classes.isRequired,
  moveData: sharedPropTypes.moveData.isRequired,
  onMoveSelect: sharedPropTypes.onMoveSelect.isRequired,
  startingColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  moveData: state.moveHistory,
  startingColor: state.settings.startingColor,
});

const mapDispatchToProps = dispatch => ({
  onMoveSelect: (index, boardId) => {
    dispatch(restoreMove(index));
    dispatch(revertBoard(boardId + 1));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withThemeAndStyles(MoveHistory, styles));
