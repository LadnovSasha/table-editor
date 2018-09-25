import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Cell.css';

const HEADER = ' abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: false, value: '' };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('unselectCells', () => this.handleUnselect());
  }

  componentWillUnmount() {
    window.removeEventListener('unselectCells');
  }


  onClick() {
    this.startEdit();
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.startEdit();
    }

    if (e.key === 'Escape') {
      this.stopEdit();
    }
  }

  startEdit() {
    window.dispatchEvent(new Event('unselectCells'));
    this.setState({ editing: true });
  }

  stopEdit() {
    this.setState({ editing: false });
  }

  handleUnselect() {
    const { editing } = this.state;

    if (editing) {
      this.setState({ editing: false });
    }
  }


  static renderHeader(title) {
    return (
      <span className="cell">
        {title}
      </span>
    );
  }

  render() {
    const { x, y } = this.props;
    const { editing, value } = this.state;
    if (y === 0) {
      return Cell.renderHeader(HEADER[x]);
    }

    if (x === 0 && y > 0) {
      return Cell.renderHeader(y);
    }

    if (editing) {
      return (
        <input
          value={value}
          onChange={this.onChange}
          tabIndex={0}
          onKeyDown={this.onKeyDown}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      );
    }

    return (
      <span
        className="cell"
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        role="textbox"
        tabIndex={0}
      >
        {value}
      </span>
    );
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
