import React from 'react';
import s from './Button.module.css'

function ButtonHooks ( { onLoadMoreBtn }) {

    const handleClickBtn = event=> {
        console.log ('Сработала функция handleClickBtn. Клинули на кнопке Загрузить ещё ', event);
        onLoadMoreBtn();

        // Прокрутка страницы вниз до кнопки Load more
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
    }

    return (
        <button className={s.Button}
            onClick = {handleClickBtn}
        > Load more</button>
  
    )

}

export default ButtonHooks;