import React, {useState, useCallback} from 'react';
import s from './Searchbar.module.css'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbarhooks ( {onFormSubmit}) {

    const [quiryWord, setQuiryWord] = useState ('')


      // const handleQueryChange = useCallback (event => {
      //   setQuiryWord ( event.currentTarget.value.toLowerCase() );
       
      //   console.log ('Сработала функция handleQueryChange с применением хука оптимизации useCallback. Значение this.state.quiryWord :', quiryWord)
      // }, [])

      const handleQueryChange = event => {
        setQuiryWord ( event.currentTarget.value.toLowerCase() );
       
        console.log ('Сработала функция handleQueryChange . Значение this.state.quiryWord :', quiryWord)
      };




      const handleSubmit = event => {
        event.preventDefault(); //сбрасываем перезагрузку по умолчанию при сабмите формы
    
        // Проверяем не пустая ли строка в инпуте
        if (quiryWord.trim() === '') {
        // alert ("Введите поисковое слово!");

        toast.error("Введите поисковое слово!",  {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })

          return;
        }
    
        onFormSubmit(quiryWord);
       
        setQuiryWord (""); //делаем сброс поискового слова после сабмита формы (для новых вводов)
      };


     
      return (
        <header className={s.Searchbar}>

<ToastContainer 
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

            <form onSubmit={handleSubmit}  className={s.SearchForm}>

                <button type="submit" className={s.SearchFormButton}>
                <span className={s.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                className={s.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={quiryWord}
                onChange ={handleQueryChange}
                />

            </form>

        </header>
    )
}

export default Searchbarhooks;