import PropTypes from 'prop-types';
import React, {useCallback, useEffect} from 'react';
import {createPortal} from 'react-dom'
import s from './Modal.module.css'

const modalRoot = document.querySelector ('#modal-root')

function Modalhooks ({onModalClose, children}) {

    useEffect ( ()=> {
        window.addEventListener ('keydown', handleKeyDown);
        console.log (" Сработал useEffect как аналог  componentDidMount() - 1 раз ")
        
        return ()=> {
            window.removeEventListener('keydown', handleKeyDown)
            console.log (" Сработал useEffect как аналог  componentWillUnmount() ")
        }
    }, []) 

          const handleKeyDown = useCallback ( event => {
            console.log ("event.code = ", event.code );
            
            if (event.code==='Escape') {
                console.log ("Нажали Escape.  Использовали хук для оптимизации useCallback")
                onModalClose() 
              } 
        }, [])

          const handleOverleyClick = useCallback ( event => {
            // Проверяем, чтобы кликнули действительно по бекдропу/оверлею и не прокликивался насквозь контент перед бекдропом
            if (event.target===event.currentTarget) {
              console.log ("Кликнули в бекдроп!!! Использовали хук для оптимизации useCallback")
              onModalClose();
            }
          }, [])

          return  createPortal (
            <div className= {s.Overlay} onClick={handleOverleyClick}>
                <div className={s.Modal}>
            
                    {/* Внимание! Если содержимое модалки будем передавать не как отдельный проп для готовой разметки (тег img),
                  а как this.props.children, то сможем переиспользовать модалку, как обычный контейнер для любого содержимого */}
                  
                  {/* {this.props.children} */}
                 
                  {children}

                  {/* <img src={this.props.largeImageURL} alt="" /> */}
              </div>
            </div>, modalRoot
          )



}

Modalhooks.propTypes = {
  onModalClose: PropTypes.func.isRequired
};


export default Modalhooks; 