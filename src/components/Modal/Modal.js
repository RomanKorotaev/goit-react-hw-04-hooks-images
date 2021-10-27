import React, {Component} from 'react';
import {createPortal} from 'react-dom'
import s from './Modal.module.css'

const modalRoot = document.querySelector ('#modal-root')

class Modal extends Component {

  componentDidMount() {
    console.log ("  componentDidMount()  ")
    window.addEventListener ('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = event => {
      console.log ("event.code = ", event.code );
      
      if (event.code==='Escape') {
          console.log ("Нажали Escape")
          this.props.onModalClose() 
        } 
  }

  handleOverleyClick = event => {
    
// Проверяем, чтобы кликнули действительно по бекдропу/оверлею и не прокликивался насквозь контент перед бекдропом
    if (event.target===event.currentTarget) {
      console.log ("Кликнули в бекдроп!!!")
      this.props.onModalClose();
    }
  }


    render() {
      return  createPortal (
            <div className= {s.Overlay} onClick={this.handleOverleyClick}>
                <div className={s.Modal}>
            
                    {/* Внимание! Если содержимое модалки будем передавать не как отдельный проп для готовой разметки (тег img),
                  а как this.props.children, то сможем переиспользовать модалку, как обычный контейнер для любого содержимого */}
                  
                  {this.props.children}
                  {/* <img src={this.props.largeImageURL} alt="" /> */}
              </div>
            </div>, modalRoot
          )

    }
}

export default Modal;

