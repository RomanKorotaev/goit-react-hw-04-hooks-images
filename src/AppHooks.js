import React, {useState, useEffect} from 'react';
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
     const [ isLoading, setIsLoading] = useState (false);


    // //  Первая загрузка. По умолчанию грузим картинки природы.
    //  useEffect ( ()=> {
    //     setIsLoading (true);

    //     setTimeout(() => {
  
    //         imageApiService.fetchImages()
    //         .then (hits=>{
    //               // Перед записью данных в state  проверяем не пустой ли массив с полученными данными
    //               if (hits.length !== 0) { 
    //                     setImagesArray ( [...hits ]); // ВАЖНО СИНТАКСИС: именно так в данной функции записываем массив
    //                 console.log (" Первая загрузка. По умолчанию грузим картинки природы. Записали hits (полученный первый массив картинок)  в  хук через setImagesArray", imagesArray );
    //               }
    //         })
    //         .finally( ()=>  setIsLoading (false));
            
    //   }, 1000);

    // }, [])



// Обновление компонента: поиск по заданному слову
      useEffect ( ()=> {   
              if(quiryWord === "") {
              console.log ("quiryWord === пустая строка")
              return;
            } else {  console.log ("quiryWord =",  quiryWord) }
////---------------------   

imageApiService.resetPage(); // перед каждым новым запросом сбрасываем на 1 (первая в числе пагинации с бекенда)
imageApiService.query = quiryWord; // обновляем значение поискового слова

setIsLoading (true);
setStatus ('panding')

console.log (" Сработала функция setIsLoading (true)")
setTimeout(() => {
    imageApiService.fetchImages()
    .then (hits=>{
          // Перед записью данных в state  проверяем не пустой ли массив с полученными данными
          if (hits.length !== 0) { 
            setImagesArray ( [...hits ] ) // ВАЖНО СИНТАКСИС: именно так в данной функции записываем массив
            console.log (" Записали hits  в   - imagesArray через хуки (аналог componentDidUpdate )", imagesArray );
            setStatus ('resolved')
          } else {alert("No images with such name!")}
    })
    .catch(() => {
        setStatus ('resolved')
        alert("Something wrong. Please try again later");
      })
    .finally( ()=> { 
      setIsLoading(false);
    } );
  }, 1000);

  
                     
}, [quiryWord] )

      const handleSummitForm = quiryWord => {
        console.log("Вызвана функция handleSummitForm = (quiryWord) : ", quiryWord);
        setQuiryWord (quiryWord) ;
      }

  // ------------------ Загрузить ещё  ------------------
      const handleLoadMore = () => {
        console.log(" Сработала функция handleLoadMore ");
      
            imageApiService.incerementPage();
      
            imageApiService.fetchImages()
            .then (hits=>{
              if (hits.length !== 0) {
                  // Обновляем предыдущее состояние массива данных и дописываем новые элементы
                    setImagesArray ( (prevState) => [...prevState, ...hits]);
                    setStatus ('resolved')                 
              }   
      
              window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                      });
            })
            .catch (rejected => {
              // alert("No images with such name!")
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
      <SearchbarHooks onFormSubmit= {handleSummitForm}/>

      <ImageGalleryHooks
      imagesArray= {imagesArray}
       onImgClick = {handleOnImgClick}/> 

      <ButtonHooks onLoadMoreBtn = {handleLoadMore}/>    

      { showModal && <ModalHooks onModalClose={toggleModal}>
           <img src={largeImageURL} alt="picture" />
         </ModalHooks> }  

    </>)}
  
     

  //     return (
  //       <div>
  //           <SearchbarHooks onFormSubmit= {handleSummitForm}/>

           
  //       {isLoading && (
  //           <Loader
  //             className="Loader"
  //             type="Circles"
  //             color="#00BFFF"
  //             height={100}
  //             width={100}
  //           />
  //         )}
  
  // <ImageGalleryHooks
  //  imagesArray= {imagesArray}
  //   onImgClick = {handleOnImgClick}/>
          
  //       {!isLoading && (  
  //         <ButtonHooks onLoadMoreBtn = {handleLoadMore}/>
  //       )}
  
  
  //       { showModal && <ModalHooks onModalClose={toggleModal}>
  //         <img src={largeImageURL} alt="picture" />
  //       </ModalHooks> }
  //       </div>
  //     )
}


export default  AppHooks;


