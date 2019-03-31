import { Button, Dialog, DialogActions, DialogContent, Grid, Switch, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { PieceCodes } from '../constants';
import { Color } from '../enums';
import Piece from './Piece';

const NO_PIECE = undefined;
const NO_TYPE = undefined;

export default class PieceSelector extends React.Component {
  constructor(props) {
    super(props);

    const { selectedPiece } = props;
    this.state = {
      hoveredPiece: NO_PIECE,
      color: selectedPiece ? selectedPiece.color : Color.BLACK,
      type: selectedPiece ? selectedPiece.type : NO_TYPE,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handlePieceMouseOut = this.handlePieceMouseOut.bind(this);
  }

  isSwitchChecked() {
    const { color } = this.state;
    return color === Color.WHITE;
  }

  handleConfirm() {
    const { onConfirm } = this.props;
    const { color, type } = this.state;

    onConfirm({ color, type });
    this.handleClose();
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handlePieceClick(type) {
    const { type: currentType } = this.state;

    this.setState({
      type: type === currentType ? NO_TYPE : type,
      hoveredPiece: NO_PIECE,
    });
  }

  handlePieceMouseOver(type) {
    this.setState({
      hoveredPiece: type,
    });
  }

  handlePieceMouseOut() {
    this.setState({
      hoveredPiece: NO_PIECE,
    });
  }

  handleSwitchChange() {
    const { color } = this.state;

    this.setState({
      color: Color.opposite(color),
    });
  }

  render() {
    const { open } = this.props;
    const { hoveredPiece, color, type } = this.state;

    return (
      <Dialog open={open}>
        <DialogContent>
          <Grid container>
            <Grid item xs={2}>
              <div>
                <Typography>Color</Typography>
              </div>
              <Switch checked={this.isSwitchChecked()} onChange={this.handleSwitchChange} />
            </Grid>
            <Grid item xs={10} container direction="row">
              {Object.entries(PieceCodes[color]).map(([currentType, code]) => (
                <Piece
                  key={code}
                  active={type === currentType}
                  hovered={hoveredPiece === currentType}
                  onMouseDown={() => this.handlePieceClick(currentType)}
                  onMouseOver={() => this.handlePieceMouseOver(currentType)}
                  onMouseOut={this.handlePieceMouseOut}
                  onFocus={() => this.handlePieceMouseOver(currentType)}
                  onBlur={this.handlePieceMouseOut}
                >
                  {code}
                </Piece>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
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
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedPiece: PropTypes.shape({
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

PieceSelector.defaultProps = {
  selectedPiece: NO_PIECE,
};
