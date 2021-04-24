import { Component } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTyps from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static PropTyps = {
    onClose: PropTyps.func.isRequired,
    src: PropTyps.string.isRequired,
    alt: PropTyps.string.isRequired,
  };

  state = {
    isLoading: true,

    // showModal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.turget) {
      this.props.onClose();
    }
  };

  handleImageLoaded = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { src, alt } = this.props;
    const { isLoading } = this.state;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          {/* {this.props.children} */}
          <img
            src={src}
            alt={alt}
            // onClose={this.toggleModal}
            onLoad={this.handleImageLoaded}
          />
          {isLoading && (
            <Loader type="Grid" color="#00BFFF" height={80} width={80} />
          )}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
