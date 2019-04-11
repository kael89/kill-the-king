import { Button, Dialog, DialogActions, DialogContent, Grid, Switch, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { PieceCodes } from '../constants';
import { Color } from '../enums';
import propTypes from '../propTypes';
import Piece from './Piece';

export default class PieceSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredPiece: null,
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.resetHoveredPiece = this.resetHoveredPiece.bind(this);
  }

  isSwitchChecked() {
    const { piece } = this.props;
    return piece.color === Color.WHITE;
  }

  resetHoveredPiece() {
    this.setState({
      hoveredPiece: null,
    });
  }

  handleConfirm() {
    const { addPiece, onClose, piece, removePiece } = this.props;

    if (piece.type) {
      addPiece(piece);
    } else {
      removePiece(piece.position);
    }

    onClose();
  }

  handlePieceClick(newType) {
    const { deselectPieceType, piece, selectPieceType } = this.props;

    if (newType === piece.type) {
      deselectPieceType();
    } else {
      selectPieceType(newType);
    }
    this.resetHoveredPiece();
  }

  handlePieceMouseOver(type) {
    this.setState({
      hoveredPiece: type,
    });
  }

  render() {
    const { hoveredPiece } = this.state;
    const { onClose, open, toggleColor, piece } = this.props;

    return (
      <Dialog open={open}>
        <DialogContent>
          <Grid container>
            <Grid item xs={2}>
              <div>
                <Typography>Color</Typography>
              </div>
              <Switch checked={this.isSwitchChecked()} onChange={toggleColor} />
            </Grid>
            <Grid item xs={10} container direction="row">
              {Object.entries(PieceCodes[piece.color]).map(([currentType, code]) => (
                <Piece
                  key={code}
                  active={piece.type === currentType}
                  hovered={hoveredPiece === currentType}
                  onMouseDown={() => this.handlePieceClick(currentType)}
                  onMouseOver={() => this.handlePieceMouseOver(currentType)}
                  onMouseOut={this.resetHoveredPiece}
                  onFocus={() => this.handlePieceMouseOver(currentType)}
                  onBlur={this.resetHoveredPiece}
                >
                  {code}
                </Piece>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PieceSelector.propTypes = {
  addPiece: PropTypes.func.isRequired,
  deselectPieceType: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  piece: propTypes.piece.isRequired,
  removePiece: PropTypes.bool.isRequired,
  selectPieceType: PropTypes.func.isRequired,
  toggleColor: PropTypes.func.isRequired,
};
