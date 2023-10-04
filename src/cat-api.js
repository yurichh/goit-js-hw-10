import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY =
  'live_XtaIkzGZj9ieaC4sFoGlLMDNTye6oG6ZVYVhIAnkDPQOkaW3uPdLZqVsKaKLLY1X';
const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value ="${id}">${name}</option>`)
    .join('');
}

function fetchBreeds() {
  return fetch(BASE_URL).then(response => {
    if (!response.ok) {
      throw new Error(`Вимушена помилка статусу: ${response.status}`);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
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
