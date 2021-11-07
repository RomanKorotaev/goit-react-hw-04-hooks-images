import React,  { useCallback }  from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css'

function ButtonHooks ( { onLoadMoreBtn }) {

    //    const handleClickBtn = useCallback ( (event) => {
    //     console.log ('Сработала функция handleClickBtn с применением хука оптимизации useCallback.  Клинули на кнопке Загрузить ещё ', event);
    //     onLoadMoreBtn();
    //             // Прокрутка страницы вниз до кнопки Load more
    //             window.scrollTo({
    //                 top: document.documentElement.scrollHeight,
    //                 behavior: 'smooth',
    //             })     
    //     }, [])

        const handleClickBtn = event => {
            console.log ('Сработала функция handleClickBtn.  Клинули на кнопке Загрузить ещё ', event);
        onLoadMoreBtn();
                // Прокрутка страницы вниз до кнопки Load more
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                }) 
        }


    return (
        <button className={s.Button}
            onClick = {handleClickBtn}
        > Load more</button>
  
    )

}

ButtonHooks.propTypes = {
    onLoadMoreBtn: PropTypes.func.isRequired
  };

export default ButtonHooks;