
const KEY_API = '23193680-1d95b6a7ab6e160162f942df5'
const BASE_URL = 'pixabay.com/api'


 class ImageApiService {

     constructor() {
         //По умолчанию для первой загрузки будет запрос на картинки природы
        //  this.searchQuery = 'nature';
        this.searchQuery = '';
         this.page = 1;
    };
    
     
     fetchImages() {
            return fetch(`https://${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY_API} `)
                    .then(response => response.json())
                    .then(data => {
                        if ( data.hits.length<1) {
                            console.log ( " data.hits.length<1  НЕТ РЕЗУЛЬТАТОВ" );
                            alert ("НЕТ РЕЗУЛЬТАТОВ")
                            } 
                                else {  return  data.hits; }
                        // console.log ( "ОТВЕТ", data)
                        // return  data.hits;
                    })
                    .catch (error  => {
                        console.log ("Произошла ошибка в ответе от бекенда: ", error)
                    });
    } 


     get query() {
         return this.searchQuery;
     }
     
     set query(newQuery) {
         this.searchQuery = newQuery;
     }

     incerementPage() {
         this.page += 1;
      }

     resetPage() {
         this.page = 1;
     }

}
 
export default ImageApiService;