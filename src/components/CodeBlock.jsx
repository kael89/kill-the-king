import classnames from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
});

const CodeBlock = ({ classes, code, language }) => (
  <Highlight {...defaultProps} code={code} language={language}>
    {({ className, getLineProps, getTokenProps, style, tokens }) => (
      <pre className={classnames(className, classes.container)} style={style}>
        {tokens.map((line, lineId) => (
          <div {...getLineProps({ line, key: lineId })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

CodeBlock.propTypes = {
  classes: propTypes.classes.isRequired,
  code: PropTypes.string,
  language: PropTypes.string,
};

CodeBlock.defaultProps = {
  code: '',
  language: '',
};

export default withThemeAndStyles(CodeBlock, styles);
