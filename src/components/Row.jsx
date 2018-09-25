import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

export default class Row extends Component {
  static buildCell(x, y) {
    return (
      <Cell
        x={x}
        y={y}
        key={`${x}-${y}`}
      />
    );
  }

  render() {
    const cells = [];
    const { x, y } = this.props;
    for (let i = 0; i < x; i++) {
      cells.push(Row.buildCell(i, y));
    }

    return (
      <div>
        {cells}
      </div>
    );
  }
}

Row.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
