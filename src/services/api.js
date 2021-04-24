// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '14395659-9e9c935ac58e7e08d55a10421';
// axios.deaults.baseURL = BASE_URL;
// axios.deaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// };
// const getImages = async ({ q, page }) => {
//   try {
//     const { data } = await axios.get('', {
//       params: { q, page },
//     });
//     return data.hits;
//   } catch (error) {
//     console.log('error', { error });
//     return [];
//   }
// };
// export default {
//   getImages,
// };

const API_KEY = '14395659-9e9c935ac58e7e08d55a10421';

function fetchImage(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=all&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет такого изображения по запросу "${query}"`),
    );
  });
}

const api = { fetchImage };

export default api;
