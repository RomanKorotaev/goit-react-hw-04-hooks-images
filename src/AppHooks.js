import React, {useState, useEffect, useRef} from 'react';
import ImageApiService from './js/apiService'
import Searchbar from './components/Searchbar'

import ImageGallery from './components/ImageGallery'
import ImageGalleryHooks from './components/ImageGallery/ImageGalleryHooks'

import Button from './components/Button'
import ButtonHooks from './components/Button/ButtonHooks'

import Modal from './components/Modal'

import Loader from "react-loader-spinner";


const imageApiService = new ImageApiService();



 function AppHooks () {
     const [ imagesArray, setImagesArray] = useState ([]);
     const [ quiryWord, setQuiryWord] = useState ("");
     const [ largeImageURL, setLargeImageURL] = useState ("");
     const [ showModal, setShowModal] = useState (false);
     const [ isLoading, setIsLoading] = useState (false);


    //  Первая загрузка картинок по умолчанию
     useEffect ( ()=> {
        setIsLoading (true);

        setTimeout(() => {
  
            imageApiService.fetchImages()
            .then (hits=>{
                  // Перед записью данных в state  проверяем не пустой ли массив с полученными данными
                  if (hits.length !== 0) { 
                        setImagesArray ( hits);
                    console.log (" Первая загрузка. По умолчанию грузим картинки природы. Записали hits (полученный первый массив картинок)  в  хук через setImagesArray", imagesArray );
                  }
            })
            .finally( ()=>  setIsLoading (false));
            
      }, 1000);

    }, [])


// Обновление компонента: поиск по заданному слову
      useEffect ( ()=> {
        // if ( quiryWord !== prevState.quiryWord) {
        if ( quiryWord !==quiryWord) {

               
            imageApiService.resetPage(); // перед каждым новым запросом сбрасываем на 1 (первая в числе пагинации с бекенда)
            imageApiService.query = setQuiryWord; // обновляем значение поискового слова
        
            setIsLoading (true);

            setTimeout(() => {
                imageApiService.fetchImages()
                .then (hits=>{
                      // Перед записью данных в state  проверяем не пустой ли массив с полученными данными
                      if (hits.length !== 0) { 
                        setImagesArray ( hits )
                        console.log (" Записали hits  в   - imagesArray через хуки", imagesArray );
                      }
                })
                .catch(() => {
                    alert("Something wrong. Please try again later");
                  })
                .finally( ()=> {
                    // setQuiryWord ('')
                    setIsLoading(false);
                } );
              }, 1000);
        }

      }, [quiryWord, isLoading, imagesArray ] )

      const handleSummitForm = quiryWord => {
        console.log("Вызвана функция handleSummitForm = (quiryWord) : ", quiryWord);
        setQuiryWord (quiryWord) // пример записи короткого свойства. Аналог: {quiryWord : quiryWord } , где второе слово- это полученный аргумент функции
      }

      const handleLoadMore = () => {
        console.log(" Сработала функция handleLoadMore ");
      
             imageApiService.incerementPage();
      
            imageApiService.fetchImages()
            .then (hits=>{
              if (hits.length !== 0) {
               
                //    this.setState ( (prevState) =>{
                //         return {
                //             imagesArray: [...prevState.imagesArray, ...hits]
                //         } 
                // } )

                setImagesArray (...imagesArray, ...hits);
                
              }   
      
              window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                      });
            });   
      }

      const handleOnImgClick = (largeImageURL) => {
        console.log ('Сработала функция handleOnImgClick. Клинули на  Img   .   largeImageURL = ', largeImageURL);
        setLargeImageURL (largeImageURL)
      
        toggleModal();
      }
     
      const toggleModal = ()=> {
        setShowModal (!showModal)
      }

      return (
        <div>
          <Searchbar onSubmit= {handleSummitForm}/>
             
        {isLoading && (
            <Loader
              className="Loader"
              type="Circles"
              color="#00BFFF"
              height={100}
              width={100}
            />
          )}
  
         <ImageGallery 
         imagesArray= {imagesArray}
         onImgClick = {handleOnImgClick}/>
          
          {!isLoading && (  
          <Button onLoadMoreBtn = {handleLoadMore}/>
          )}
  
  
         {/* Рендерим по условию модалку с любым дочерним элементом/содержимым - через props.children         */}
          { showModal && <Modal onModalClose={toggleModal}>
            <img src={largeImageURL} alt="Some Img" />
            </Modal> }
        </div>
      )
}


export default  AppHooks;