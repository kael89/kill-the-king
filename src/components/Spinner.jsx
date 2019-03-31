import PropTypes from 'prop-types';
import React from 'react';

const Spinner = ({ color, fill, opacity }) => (
  // Based on a spinner svg by Sam Herbert(@sherb) @http://goo.gl/7AJzbL
  <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
    <g fill={fill} fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="2">
        <circle cx="18" cy="18" r="18" stroke={color} strokeOpacity={opacity} />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

Spinner.propTypes = {
  color: PropTypes.string,
  fill: PropTypes.string,
  opacity: PropTypes.number,
};

Spinner.defaultProps = {
  color: '#000',
  fill: 'none',
  opacity: 0.5,
};

export default Spinner;
