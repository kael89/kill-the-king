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

    this.resetHoveredPiece = this.resetHoveredPiece.bind(this);
  }

  resetHoveredPiece() {
    this.setState({
      hoveredPiece: null,
    });
  }

  handlePieceMouseOver(type) {
    this.setState({
      hoveredPiece: type,
    });
  }

  render() {
    const { hoveredPiece } = this.state;
    const { color } = this.props;

    return (
      <Grid container>
        <Grid item xs={10} container direction="row">
          {Object.entries(PieceCodes[color]).map(([currentType, code]) => (
            <Piece
              key={code}
              hovered={hoveredPiece === currentType}
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
    );
  }
}

PieceSelector.propTypes = {
  color: PropTypes.string.isRequired,
};
