import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  state = {};
  render() {
    return (
      <button type="button" className={s.Button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
