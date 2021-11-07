import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageApiService from './js/apiService'
import SearchbarHooks from './components/Searchbar/SearchbarHooks'
import ImageGalleryHooks from './components/ImageGallery/ImageGalleryHooks'
import ButtonHooks from './components/Button/ButtonHooks'
import ModalHooks from './components/Modal/ModalHooks'
import Loader from "react-loader-spinner";


const imageApiService = new ImageApiService();


 function AppHooks () {
     const [ imagesArray, setImagesArray] = useState ([]);
     const [ quiryWord, setQuiryWord] = useState ("");
     const [ largeImageURL, setLargeImageURL] = useState ("");

     const [status, setStatus] = useState( 'idel');

     const [ showModal, setShowModal] = useState (false);
   
// Обновление компонента: поиск по заданному слову
      useEffect ( ()=> {   
              if(quiryWord === "") {
              console.log ("quiryWord === пустая строка")
              return;
            } else {  console.log ("quiryWord =",  quiryWord) }
  ////---------------------   



  imageApiService.resetPage(); // перед каждым новым запросом сбрасываем на 1 (первая в числе пагинации с бекенда)
  imageApiService.query = quiryWord; // обновляем значение поискового слова

 
  setStatus ('panding')

  setTimeout(() => {
      imageApiService.fetchImages()
      .then (hits=>{
            // Перед записью данных в state  проверяем не пустой ли массив с полученными данными
            if (hits.length > 1) { 
              setImagesArray ( [...hits ] ) // ВАЖНО СИНТАКСИС: именно так в данной функции записываем массив
              console.log (" Записали hits  в   - imagesArray через хуки (аналог componentDidUpdate )", imagesArray );
              setStatus ('resolved');

                toast.success('Success!', {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });  
            } else { 
              console.log ("Нет картинок по такому поисковому слову!");
              setStatus ('idel');

              toast.info('Нет картинок по такому поисковому слову!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            }
      })
      .catch(err => {
        console.log ("err : ", err)
          setStatus ('rejected')
          alert("Something wrong!");
          return err;
        });
    }, 1000);                    
}, [quiryWord] )


console.log ("imagesArray после срабатівания функции  useEffect :", imagesArray)

      const handleSummitForm = quiryWord => {
        console.log("Вызвана функция handleSummitForm = (quiryWord) : ", quiryWord);
        setQuiryWord (quiryWord) ;
        
      }


  // ------------------ Загрузить ещё  ------------------
      const handleLoadMore = () => {
        console.log(" Сработала функция handleLoadMore - КНОПКА ЗАГРУЗИТЬ ЕЩЁ ");
      
        console.log("Значение поискового слова в классе : ", imageApiService.query)
       
            imageApiService.incerementPage();
      
            imageApiService.fetchImages()
            .then (hits=>{
              if (hits.length !== 0) {
                  // Обновляем предыдущее состояние массива данных и дописываем новые элементы
                    setImagesArray ( (prevState) => [...prevState, ...hits]);
                    console.log ("Запись массива через  ЗАГРУЗИТЬ ЕЩЁ" , imagesArray)
                    setStatus ('resolved');
                       
                    toast.success('Success!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });                
              }   
      
              window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                      });
            })
            .catch (rejected => {
              console.log ("Ошибка при нажатии на кнопку ЗАГРУЗИТЬ ЕЩЁ", rejected)
              setStatus ('rejected')
            });   
      }

      const handleOnImgClick = (largeImageURL) => {
        setLargeImageURL (largeImageURL)
        toggleModal();
      }
     
      const toggleModal = ()=> {
        setShowModal (!showModal)
      }

      // ----------------- Рендеринг в зависимости от статуса  -----------------
 if (status==='idel') {
    return  <SearchbarHooks onFormSubmit= {handleSummitForm}/> }

    if (status==='panding') {
      return (
        <>
          <SearchbarHooks onFormSubmit= {handleSummitForm}/>
            <Loader
                    className="Loader"
                    type="Circles"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  /> 
        </>)}

if (status==='resolved') {
  return (
    <>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

      <SearchbarHooks onFormSubmit= {handleSummitForm}/>


      <ImageGalleryHooks
      imagesArray= {imagesArray}
       onImgClick = {handleOnImgClick}/> 

      <ButtonHooks onLoadMoreBtn = {handleLoadMore}/>    

      { showModal && <ModalHooks onModalClose={toggleModal}>
           <img src={largeImageURL} alt="picture" />
         </ModalHooks> }  

    </>)}


if (status==='rejected') {
  return  <>
 <SearchbarHooks onFormSubmit= {handleSummitForm}/>
  <p><b>Oooops! Thomething wrong! Try againe! :( </b></p> 
  </>}
  
  
}


export default  AppHooks;


