import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import chunk from 'lodash/chunk';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { COLOR } from '../enums';
import propTypes from '../propTypes';
import { revertBoard } from '../store/board/actions';
import { restoreMove } from '../store/moveHistory/actions';
import { withThemeAndStyles } from '../utilities/generic';
import ExpansionPanel from './ExpansionPanel';
import MoveButton from './MoveButton';

const { BLACK } = COLOR;

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

const BaseMoveRow = ({ classes, id, renderMoves, onMoveSelect }) => (
  <TableRow className={classes.row}>
    <TableCell className={classes.rowNumber}>{id + 1}.</TableCell>
    {renderMoves.map((renderMove, index) => {
      const { boardId } = renderMove;
      const moveId = id * 2 + index;

      return (
        <TableCell key={boardId} className={classes.move}>
          {boardId === -1 ? (
            ''
          ) : (
            <MoveButton onClick={() => onMoveSelect(moveId, boardId)} {...renderMove} />
          )}
        </TableCell>
      );
    })}
  </TableRow>
);

BaseMoveRow.propTypes = {
  id: PropTypes.number.isRequired,
  classes: propTypes.classes.isRequired,
  renderMoves: propTypes.renderMoves.isRequired,
  onMoveSelect: PropTypes.func.isRequired,
};

const MoveRow = withThemeAndStyles(BaseMoveRow, styles);

const sanitizeRenderMoves = (renderMoves, startingColor) => {
  const emptyMove = { boardId: -1, move: '', notation: { pieceCode: '', text: '' } };

  const result = [...renderMoves];
  if (result.length > 0 && startingColor === BLACK) {
    result.unshift(emptyMove);
  }
  if (result.length % 2 === 1) {
    // Make result length even for consistent line width
    result.push(emptyMove);
  }

  return result;
};

const MoveHistory = ({ classes, renderMoves, startingColor, onMoveSelect }) => {
  const sanitizedRenderedMoves = sanitizeRenderMoves(renderMoves, startingColor);

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
            {chunk(sanitizedRenderedMoves, 2).map((renderMovePair, rowId) => (
              <MoveRow
                key={renderMovePair[0].boardId}
                id={rowId}
                renderMoves={renderMovePair}
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
  renderMoves: propTypes.renderMoves.isRequired,
  onMoveSelect: PropTypes.func.isRequired,
  startingColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  renderMoves: state.moveHistory,
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
