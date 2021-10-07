import React from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

import styles from "./ImageGallery.module.css";

const ImageGallery = ({ gallery, onPictureClick }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {gallery.map((hit) => (
          <ImageGalleryItem
            largeImg={hit.largeImageURL}
            imgURl={hit.webformatURL}
            key={hit.id}
            onPictureClick={onPictureClick}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default ImageGallery;
