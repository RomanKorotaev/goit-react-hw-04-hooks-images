import React, {useState, useCallback} from 'react';
import s from './Searchbar.module.css'

function Searchbarhooks ( {onSubmit}) {

    const [quiryWord, setQuiryWord] = useState ('')


      const handleQueryChange = useCallback (event => {
        setQuiryWord ( event.currentTarget.value.toLowerCase() );
       
        console.log ('Сработала функция handleQueryChange с применением хука оптимизации useCallback. Значение this.state.quiryWord :', quiryWord)
      }, [])



      const handleSubmit = event => {
        event.preventDefault(); //сбрасываем перезагрузку по умолчанию при сабмите формы
    
        // Проверяем не пустая ли строка в инпуте
        if (quiryWord.trim() === '') {
        alert ("Введите поисковое слово!")
          return;
        }
    
         onSubmit(quiryWord);
        setQuiryWord (""); //делаем сброс поискового слова после сабмита формы (для новых вводов)
      };


      return (
        <header className={s.Searchbar}>

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