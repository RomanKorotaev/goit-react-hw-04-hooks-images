import React, {useState} from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

function ImageGalleryItemHooks (webformatURL, largeImageURL,id, tags, onImgClickImageGalleryItem) {

    const [webformatURLItem, setWebformatURLItem] = useState ("");
    const [largeImageURLItem, setLargeImageURLItem] = useState (largeImageURL);
    const [tagsItem, setTagsItem] = useState ("");
    const [idItem, setIdItem] = useState (id);

    const onImgClick = event=> { 
        console.log ('Сработала функция onImgClickImageGalleryItem. Клинули на  Img . ', event);
        onImgClickImageGalleryItem(largeImageURLItem);
    }

    return (
        <img 
            src={webformatURL}
            alt={tags}
            className={s.ImageGalleryItemImage}
            onClick = {onImgClick}
            id={idItem}/>
        )

}

export default ImageGalleryItemHooks;