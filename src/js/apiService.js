
const KEY_API = '23193680-1d95b6a7ab6e160162f942df5'
const BASE_URL = 'pixabay.com/api'


 class ImageApiService {

     constructor() {
         //По умолчанию для первой загрузки будет запрос на картинки природы
         this.searchQuery = 'nature';
         this.page = 1;
    };
    
     
     fetchImages() {
            return fetch(`https://${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY_API} `)
                    .then(response => response.json())
                    .then(data => {
                        return  data.hits;
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