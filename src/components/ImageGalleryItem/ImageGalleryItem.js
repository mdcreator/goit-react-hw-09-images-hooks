import { useState } from 'react';
import Modal from '../Modal';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  imageData: { id, webformatURL, largeImageURL },
}) {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleImageClick = e => {
    setImage(e.target.dataset.img);
    toggleModal();
  };

  // this.setState(({ showModal }) => ({ showModal: !showModal }));

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={id}
          className={s.ImageGalleryItemImage}
          data-img={largeImageURL}
          onClick={handleImageClick}
        />
      </li>
      {showModal && <Modal onClose={toggleModal} src={image} />}
    </>
  );
}

ImageGalleryItem.propTyps = {
  imageData: PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
};
