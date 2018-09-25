import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const Table = ({ x, y }) => {
  const rows = [];
  for (let currY = 0; currY < y + 1; currY++) {
    rows.push((
      <Row
        x={x + 1}
        y={currY}
        key={`row-${currY}`}
      />
    ));
  }

  return (
    <div>
      {rows}
    </div>
  );
};

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Table;
