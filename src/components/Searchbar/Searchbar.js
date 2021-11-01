// import React, {Component} from 'react';
// import s from './Searchbar.module.css'

// class Searchbar extends Component {

//     state = {
//         quiryWord: '',
//       };
    
//       handleQueryChange = event => {
//         this.setState({  quiryWord: event.currentTarget.value.toLowerCase() });
//         console.log ('Сработала функция handleQueryChange ... Значение this.state.quiryWord :', this.state.quiryWord)
//       };


//       handleSubmit = event => {
//         event.preventDefault(); //сбрасываем перезагрузку по умолчанию при сабмите фломы
    
//         // Проверяем не пустая ли строка в инпуте
//         if (this.state.quiryWord.trim() === '') {
//         alert ("Введите поисковое слово!")
//           return;
//         }
    
//         this.props.onSubmit(this.state.quiryWord);
//         this.setState({ quiryWord: "" }); //делаем сброс поискового слова после сабмита формы (для новых вводов)
//       };
    


//     render() {
//         return (
//             <header className={s.Searchbar}>

//                 <form onSubmit={this.handleSubmit}  className={s.SearchForm}>

//                     <button type="submit" className={s.SearchFormButton}>
//                     <span className={s.SearchFormButtonLabel}>Search</span>
//                     </button>

//                     <input
//                     className={s.SearchFormInput}
//                     type="text"
//                     autoComplete="off"
//                     autoFocus
//                     placeholder="Search images and photos"
//                     value={this.state.quiryWord}
//                     onChange ={this.handleQueryChange}
//                     />

//                 </form>

//             </header>
//         )
//     }
// }

// export default Searchbar;