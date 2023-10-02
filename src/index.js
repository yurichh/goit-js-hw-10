import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_XtaIkzGZj9ieaC4sFoGlLMDNTye6oG6ZVYVhIAnkDPQOkaW3uPdLZqVsKaKLLY1X';

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    let catNamesArr = [];
    data
      .filter(cat => {
        cat.length < 7;
      })
      .map(catName => {
        catNamesArr.push(catName);
      });
    console.log(catNamesArr);
    console.log(cat);
  })
  .catch(err => {
    console.log(err);
  });
