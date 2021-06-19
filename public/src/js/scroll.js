import jump from '/node_modules/jump.js/dist/jump.module.js';

let input = document.querySelector('.input');
const search = document.getElementById('search');
const cta = document.querySelector('.cta');

search.addEventListener('click', () => {
  let searchItem = input.value.toLowerCase();
  if (searchItem == 'steel') {
    jump('.steel');
  } else if (searchItem == 'bolt' || searchItem == 'bolts') {
    jump('.bolts');
  } else if (searchItem == 'motherboard') {
    jump('.board');
  } else if (searchItem == 'propellers' || searchItem == 'propeller') {
    jump('.propelrs');
  } else if (searchItem == 'washers' || searchItem == 'washer') {
    jump('.washer');
  } else if (searchItem == 'engine' || searchItem == 'engines') {
    jump('.engine');
  } else if (
    searchItem == 'shafts' ||
    searchItem == 'shaft' ||
    searchItem == 'crankshaft'
  ) {
    jump('.shaft');
  }
});

cta.addEventListener('click', () => {
  jump('.steel');
});
