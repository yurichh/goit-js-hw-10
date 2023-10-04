import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed, createMarkup } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catWrapper = document.querySelector('.cat-info');

loader.style.display = 'none';
catWrapper.style.display = 'none';

// new SlimSelect({
//   select: document.querySelector('.breed-select'),
//   settings: {
//     placeholderText: 'Choose a breed',
//   },
// });

fetchBreeds()
  .then(data => {
    select.innerHTML = createMarkup(data);
  })
  .catch(err => {
    console.log(err);
    Notiflix.Notify.failure(`${err}`);
  });

select.addEventListener('change', () => {
  catWrapper.style.display = 'none';
  loader.style.display = 'block';
  handleSearch(select.value);
});

function handleSearch(id) {
  fetchCatByBreed(id)
    .then(data => {
      data.map(info => {
        console.log(info.breeds);
        info.breeds.map(cat => {
          const catData = {
            name: cat.name,
            description: cat.description,
            temperament: cat.temperament,
            wikipedia: cat.wikipedia_url,
          };
          catWrapper.style.display = 'block';
          catWrapper.innerHTML = `<a href="${catData.wikipedia}"><div class="cat-wrapper">
        <img src="${info.url}" alt="name" width="400" />
        <h1>${catData.name}</h1>
        <p>${catData.description}</p>
        <h2>Temperament:</h2>
        <p>${catData.temperament}</p>
      </div></a>`;
        });
        loader.style.display = 'none';
      });
    })
    .catch(err => {
      catWrapper.innerHTML = '';
      Notiflix.Notify.failure(`${err}`);
      return;
    });
}
