// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import s from './ImageGalleryItem.module.css'

// class ImageGalleryItem extends Component {

//     state = {
//         webformatURL: "",
//         largeImageURL:  this.props.largeImageURL,
//         tags:"",
//         id: this.props.id 
//       }

//     onImageClick= event=> { 
//         console.log ('Сработала функция onImgClickImageGalleryItem. Клинули на  Img . ', event);
//         this.props.onImgClickImageGalleryItem(this.state.largeImageURL);
//     }

//     render() {
//                 const {webformatURL, tags } = this.props;
//         return (
//         <img 
//             src={webformatURL}
//             alt={tags}
//             className={s.ImageGalleryItemImage}
//             onClick = {this.onImageClick}
//             id={this.state.id}/>
//         )
//     }
// }

// ImageGalleryItem.propTypes = {
//     webformatURL: PropTypes.string,
// };


// export default ImageGalleryItem;