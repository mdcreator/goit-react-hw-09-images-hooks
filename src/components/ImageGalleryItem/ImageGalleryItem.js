import { Component } from 'react';

import Modal from '../Modal';
import PropTyps from 'prop-types';

import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static PropTyps = {
    id: PropTyps.number.isRequired,
    webformatURL: PropTyps.string.isRequired,
    largeImageURL: PropTyps.string.isRequired,
  };

  state = {
    showModal: false,
    image: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  // this.setState(({ showModal }) => ({ showModal: !showModal }));

  handleImageClick = e => {
    this.setState({
      image: e.target.dataset.img,
    });
    this.toggleModal();
  };

  render() {
    const { showModal, image } = this.state;
    const { id, webformatURL, largeImageURL } = this.props.imageData;
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={id}
            className={s.ImageGalleryItemImage}
            data-img={largeImageURL}
            onClick={this.handleImageClick}
          />
        </li>
        {showModal && <Modal onClose={this.toggleModal} src={image} />}
      </>
    );
  }
}

export default ImageGalleryItem;
