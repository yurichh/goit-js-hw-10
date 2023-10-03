import axios from 'axios';
import Notiflix from 'notiflix';

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_XtaIkzGZj9ieaC4sFoGlLMDNTye6oG6ZVYVhIAnkDPQOkaW3uPdLZqVsKaKLLY1X';
axios.defaults.headers.common['x-api-key'] = api_key;

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value ="${id}">${name}</option>`)
    .join('');
}

function fetchBreeds() {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Вимушена помилка статусу: ${response.status}`);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`Вимушена помилка статусу: ${response.status}`);
    }
    return response.json();
  });
}
export {
  fetchBreeds,
  fetchCatByBreed,
  createMarkup,
  getCatInfo,
  getCatSource,
  createWrapperMarkup,
};
