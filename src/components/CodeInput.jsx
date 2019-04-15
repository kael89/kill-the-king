import { FilledInput, FormControl, InputLabel } from '@material-ui/core';
import classnames from 'classnames';
import Highlight, { defaultProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React from 'react';

import propTypes from '../propTypes';
import { withThemeAndStyles } from '../utils';

const styles = theme => ({
  input: {
    fontFamily: 'monospace',
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 3,
  },
});

const CodeInput = ({ classes, code, error, fullWidth, id, label, onChange, rows }) => (
  <FormControl error={error} fullWidth={fullWidth} variant="filled">
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Highlight {...defaultProps} code={code}>
      {({ className, style }) => (
        <FilledInput
          className={classnames(classes.input, className)}
          id={id}
          multiline
          onChange={onChange ? e => onChange(e) : null}
          rows={rows}
          value={code}
          style={style}
        />
      )}
    </Highlight>
  </FormControl>
);

CodeInput.propTypes = {
  classes: propTypes.classes.isRequired,
  code: PropTypes.string,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
};

CodeInput.defaultProps = {
  code: '',
  error: false,
  fullWidth: true,
  id: `code-input-${Date.now()}`,
  label: '',
  onChange: PropTypes.null,
  rows: 1,
};

export default withThemeAndStyles(CodeInput, styles);
