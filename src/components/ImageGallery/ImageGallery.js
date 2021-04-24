import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';
import PropTyps from 'prop-types';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static PropTyps = {
    gallery: PropTyps.array.isRequired,
  };

  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.gallery.map((item, index) => {
          return <ImageGalleryItem imageData={item} key={index} />;
        })}
      </ul>
    );
  }
}

export default ImageGallery;
