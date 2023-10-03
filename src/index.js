import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed, createMarkup } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catWrapper = document.querySelector('.cat-info');
const catWrapper2 = document.querySelector('.cat-info2');

loader.style.display = 'none';

// new SlimSelect({
//   select: select,
//   settings: { placeholderText: 'Choose a cat name' },
//   contentPosition: 'absolute', // 'absolute' or 'relative'
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
  catWrapper.innerHTML = '';
  catWrapper2.innerHTML = '';
  loader.style.display = 'block';
  handleSearch(select.value);
});

function handleSearch(id) {
  fetchCatByBreed(id)
    .then(data => {
      data.map(info => {
        const url = info.url;
        catWrapper.innerHTML = `<img src="${url}" alt='name' width ='400'>`;
      });
    })
    .catch(err => {
      catWrapper2.innerHTML = '';
      catWrapper.innerHTML = '';
      Notiflix.Notify.failure(`${err}`);
      return;
    });
  fetchBreeds()
    .then(data => {
      data.map(info => {
        if (info.id === select.value) {
          catWrapper2.innerHTML = `<h1>${info.name}</h1>
       <p>${info.description}</p>
       <h2>Temperament:</h2>
       <p>${info.temperament}</p>`;
        }
      });
      loader.style.display = 'none';
    })
    .catch(err => {
      catWrapper.innerHTML = '';
      catWrapper2.innerHTML = '';
      Notiflix.Notify.failure(`${err}`);
      return;
    });
}

// getCatInfo().then(data => {
//   data.map(data => {
//     const catData = {
//       name: data.name,
//       description: data.description,
//       temperament: data.temperament,
//     };
//     console.log(catData);
//   });
// });
