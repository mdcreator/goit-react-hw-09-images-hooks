import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, src }) {
  const [loading, setLoading] = useState(false);

  const handleImageLoad = () => {
    setLoading(prev => !prev);
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.turget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    handleImageLoad();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // const handleImageLoaded = () => {
  //   this.setState({ isLoading: false });
  // };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        {/* {this.props.children} */}
        <img
          src={src}
          alt=""
          // onClose={this.toggleModal}
          onLoad={handleImageLoad}
        />
        {loading && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        )}
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
