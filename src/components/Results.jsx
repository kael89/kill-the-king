import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { NotationHelper } from '../helpers';
import propTypes from '../propTypes';
import ExpansionPanel from './ExpansionPanel';
import Move from './Move';
import Spinner from './Spinner';

const Results = ({ data, initialBoard, loading, error }) => {
  let contents;
  if (error.length > 0) {
    // TODO format here
    contents = <p>Error: {error}</p>;
  } else if (loading) {
    contents = <Spinner />;
  } else {
    contents = (
      <>
        <div>
          {data === null ? (
            <Typography>Click &quot;Go&quot; to detect forced checkmates</Typography>
          ) : (
            data.map(move => (
              <div key={move}>
                {' '}
                <Typography>
                  <Move notation={NotationHelper.getNotation(initialBoard, move)} />
                </Typography>
              </div>
            ))
          )}
        </div>
      </>
    );
  }

  return <ExpansionPanel summary="Results">{contents}</ExpansionPanel>;
};

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  initialBoard: propTypes.board.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

Results.defaultProps = {
  data: null,
  loading: false,
  error: '',
};

export default Results;
