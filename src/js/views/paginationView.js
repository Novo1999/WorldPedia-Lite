import View from './View';
import { init } from '../model';

const view = new View();
const btns = document.querySelector('.pagination');
let btnValue = document.querySelectorAll('.btn-value');

let currPage = 1;

export function pagination(data) {
  let countriesPerPage = 10;
  let totalItems = data.length;
  let totalPages = Math.ceil(totalItems / countriesPerPage);
  showSpecificPage(data, countriesPerPage);
  btns.addEventListener('click', e => {
    if (e.target.classList.contains('btn-prev')) {
      if (currPage !== 1) showPreviousPage();
      updateButtons(e, btnValueArray[0], btnValueArray[1], btnValueArray[2]);
    }

    if (e.target.classList.contains('btn-next')) {
      if (currPage !== totalPages - 1) {
        showNextPage();
        updateButtons(e, btnValueArray[0], btnValueArray[1], btnValueArray[2]);
      }
    }
    btnValue = document.querySelectorAll('.btn-value');
    showSpecificPage(data, countriesPerPage);
  });

  function showPreviousPage() {
    currPage--;
    if (currPage >= 1) {
      showPage(data, currPage, countriesPerPage);
    }
  }
  function showNextPage() {
    currPage++;
    if (currPage < totalPages) {
      showPage(data, currPage, countriesPerPage);
    }
  }
}

function showPage(data, currPage, countriesPerPage) {
  const start = (currPage - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  view._parentElement.innerHTML = '';
  data
    .slice(start, end)
    .forEach(country =>
      view.renderCountries(
        country.flags.png,
        country.name.common,
        country.population,
        country.region,
        country.capital
      )
    );
}

function showSpecificPage(data, countriesPerPage) {
  btnValue.forEach(btn =>
    btn.addEventListener('click', e => {
      currPage = +e.target.innerHTML;
      e.stopPropagation();
      showPage(data, e.target.innerHTML, countriesPerPage);
    })
  );
}

// Update pagination buttons
let btnValueArray = [];

btnValue.forEach(value => btnValueArray.push(+value.innerHTML));

function updateButtons(e, btn1, btn2, btn3) {
  if (e.target.classList.contains('btn-next')) {
    if (btn3 === 25) return;
    btn1++;
    btn2++;
    btn3++;
    btnValueArray = [btn1, btn2, btn3];
  }
  if (e.target.classList.contains('btn-prev')) {
    if (btn3 === 3) return;
    btn1--;
    btn2--;
    btn3--;
    btnValueArray = [btn1, btn2, btn3];
  }
  const markup = `
  <button class="btn-prev">&larr;</button>
  <button class="btn-value">${btn1}</button>
  <button class="btn-value">${btn2}</button>
  <button class="btn-value">${btn3}</button>
  <button class="btn-next">&rarr;</button>`;
  btns.innerHTML = markup;
}
