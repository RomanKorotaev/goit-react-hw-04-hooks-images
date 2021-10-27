import React, {Component} from 'react';
import s from './Button.module.css'

class Button extends Component {

    handleClickBtn = event=> {
        console.log ('Сработала функция handleClickBtn. Клинули на кнопке Загрузить ещё ', event);
      
        this.props.onLoadMoreBtn();

        // Прокрутка страницы вниз до кнопки Load more
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });

 
    }

    render() {
        return (
            <button className={s.Button}
                onClick = {this.handleClickBtn}
            > Load more</button>
      
        )
    }
}

export default Button;