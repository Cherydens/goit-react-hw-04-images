import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ searchResults }) {
  return (
    searchResults && (
      <Gallery>
        {searchResults.map(({ id, ...restProps }) => (
          <ImageGalleryItem key={id} imageCard={restProps} />
        ))}
      </Gallery>
    )
  );
}

ImageGallery.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      restProps: PropTypes.object,
    })
  ).isRequired,
};
