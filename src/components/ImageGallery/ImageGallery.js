import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGallery({ gallery }) {
  return (
    <ul className={s.ImageGallery}>
      {gallery.map((item, index) => {
        return <ImageGalleryItem imageData={item} key={index} />;
      })}
    </ul>
  );
}

ImageGallery.propTyps = {
  gallery: PropTypes.array.isRequired,
};
