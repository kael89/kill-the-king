import { FileCopy as CopyIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import IconButton from './IconButton';

class CopyToClipboardButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.handleOnCopy = this.handleOnCopy.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleOnCopy() {
    this.setState({
      copied: true,
    });
  }

  handleMouseOver() {
    this.setState({
      copied: 'Copy to clipboard',
    });
  }

  handleMouseOut() {
    this.setState({
      copied: false,
    });
  }

  render() {
    const { copied } = this.state;
    const { text, ...otherProps } = this.props;

    return (
      <CopyToClipboard text={text} onCopy={this.handleOnCopy} {...otherProps}>
        <IconButton
          icon={<CopyIcon />}
          title={copied ? 'Copied' : 'Copy to clipboard'}
          onBlur={this.handleMouseOut}
          onFocus={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onMouseOver={this.handleMouseOver}
        />
      </CopyToClipboard>
    );
  }
}

CopyToClipboardButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyToClipboardButton;
