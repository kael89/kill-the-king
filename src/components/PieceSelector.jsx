import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import DraggablePieceContainer from '../containers/DraggablePieceContainer';
import { PieceType } from '../enums';

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
          {PieceType.allByPower.map(type => (
            <DraggablePieceContainer
              key={type}
              hovered={hoveredPiece === type}
              onMouseOver={() => this.handlePieceMouseOver(type)}
              onMouseOut={this.resetHoveredPiece}
              onFocus={() => this.handlePieceMouseOver(type)}
              onBlur={this.resetHoveredPiece}
              piece={{ color, type, position: '' }}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}

PieceSelector.propTypes = {
  color: PropTypes.string.isRequired,
};
