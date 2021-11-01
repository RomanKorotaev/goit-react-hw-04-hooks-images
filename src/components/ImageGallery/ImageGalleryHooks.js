import React, { useCallback }  from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';


import ImageGalleryItemHooks from  '../ImageGalleryItem/ImageGalleryItemHooks'

function ImageGalleryHooks ( {imagesArray, onImgClick} ){

              const onImgClickImageGallery = useCallback ( largeImageURL => {
              console.log ('Сработала функция onImgClickImageGallery через хук useCallback. Клинули на  Img   . largeImageURL = ', largeImageURL);
              onImgClick(largeImageURL) }, [] )
          


          return (
            <ul className={s.ImageGallery}>
            { imagesArray.map(({id, webformatURL, largeImageURL, tags }) => (
              <li  key = {id}>
                  <ImageGalleryItemHooks 
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    id= {id}
                    onImgClickImageGalleryItem = {onImgClickImageGallery}
                    />
              </li>
          ))}
             </ul>
        )    
}

ImageGalleryHooks.propTypes = {
  imagesArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
  onImgClick: PropTypes.func.isRequired
};

export default ImageGalleryHooks;