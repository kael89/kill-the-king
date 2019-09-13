import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PIECE_CODES } from '../constants';
import { PROP_TYPES } from '../propTypes';
import { withThemeAndStyles } from '../utilities/generic';

const styles = theme => ({
  container: {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '3rem',
    color: theme.piece.color,
    display: 'inlineBlock',
  },
  hinted: {
    color: theme.piece.hinted,
  },
  hovered: {
    background: theme.piece.hovered,
  },
});

class Piece extends React.Component {
  state = {
    hovered: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      hovered: true,
    });
  }

  handleMouseOut() {
    this.setState({
      hovered: false,
    });
  }

  render() {
    const { hovered } = this.state;
    const {
      children,
      classes,
      hinted,
      hoverColor,
      piece: { type, color },
      theme,
      ...otherProps
    } = this.props;

    return (
      <div
        {...otherProps}
        data-testid="piece"
        data-type={type}
        data-color={color}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onFocus={this.handleMouseOut}
        onBlur={this.handleMouseOut}
        className={classnames(classes.container, { [classes.hinted]: hinted })}
        style={hovered && hoverColor ? { backgroundColor: hoverColor } : {}}
      >
        {PIECE_CODES[color][type]}
      </div>
    );
  }
}

Piece.propTypes = {
  children: PROP_TYPES.children,
  classes: PROP_TYPES.classes.isRequired,
  hinted: PropTypes.bool,
  hoverColor: PropTypes.string,
  piece: PROP_TYPES.piece.isRequired,
  theme: PROP_TYPES.theme.isRequired,
};

Piece.defaultProps = {
  children: null,
  hinted: false,
  hoverColor: '',
};

export default withThemeAndStyles(Piece, styles);
