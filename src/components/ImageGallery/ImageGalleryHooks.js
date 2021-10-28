import React  from 'react';
import s from './ImageGallery.module.css'
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem'


function ImageGalleryHooks ( {imagesArray, onImgClick}){

            const onImgClickImageGallery = (largeImageURL) => {
            console.log ('Сработала функция onImgClickImageGallery. Клинули на  Img   . largeImageURL = ', largeImageURL);
            onImgClick(largeImageURL)
          }


          return (
            <ul className={s.ImageGallery}>
            { imagesArray.map(({id, webformatURL, largeImageURL, tags }) => (
              <li  key = {id}>
                  <ImageGalleryItem 
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

export default ImageGalleryHooks;