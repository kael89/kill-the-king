import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import chunk from 'lodash/chunk';
import PropTypes from 'prop-types';
import React from 'react';

import MoveButtonContainer from '../containers/MoveButtonContainer';
import { Color } from '../enums';
import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';
import ExpansionPanel from './ExpansionPanel';

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
          {boardId === -1 ? '' : <MoveButtonContainer onClick={() => onMoveSelect(moveId, boardId)} {...moveDatum} />}
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
  const movePlaceholder = { boardId: -1, move: '', notation: { code: '', text: '' } };

  const result = [...moveData];
  if (moveData.length > 0 && startingColor === Color.BLACK) {
    result.unshift(movePlaceholder);
  }
  if (moveData.length % 2 === 1) {
    result.push(movePlaceholder);
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
              <MoveRow key={movePair[0].boardId} id={rowId} moveData={movePair} onMoveSelect={onMoveSelect} />
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

export default withThemeAndStyles(MoveHistory, styles);
