import { view } from './View';
import { pagBtn } from './paginationView';
import { filterOption } from './regionView';
import { getData } from '../model';
import { showPage, currPage, showSpecificPage } from './paginationView';
import {
  favoriteCountryMark,
  initFavorites,
  favoriteState,
} from './favoritesView';
const country = document.querySelector('.grid-items');

export function countryView(
  img,
  name,
  native,
  pop,
  reg,
  sub,
  cap,
  domain,
  currency,
  lang
) {
  view._parentElement.innerHTML = '';
  const markup = `
    <div class="country-view">
    <div>
      <button class="back">&larr; Back</button>
      <img src="${img}" alt="flag" />
    </div>
    <div class="country-details">
      <div>
        <h1 class="country-name">${name}</h1>
        <p><span class="bold">Native Name:</span>${
          Object.entries(native)[0][1].official
        }</p>
        <p><span class="bold">Population:</span>${
          pop.toString().length > 6 ? pop / 1000000 + 'M' : pop
        }</p>
        <p><span class="bold">Region:</span>${reg}</p>
        <p><span class="bold">Sub Region:</span>${sub ? sub : 'N/A'}</p>
        <p><span class="bold">Capital:</span>${cap ? cap : 'N/A'}</p>
      </div>
      <div class="det-2">
        <p><span class="bold">Top Level Domain:</span>${domain[0]}</p>
        <p><span class="bold">Currencies:</span>${
          currency ? Object.entries(currency)[0][1].name : 'N/A'
        }</p>
        <p><span class="bold">Languages:</span>${Object.values(lang).join(
          ', '
        )}</p>
      </div>
      <div>
        <p class="borders">
          <span class="bold">Border Countries:</span>
          <span class="border-country">France</span>
        </p>
      </div>
    </div>
  </div>`;
  country.style.display = 'flex';
  country.innerHTML = markup;
  pagBtn.style.visibility = 'hidden';
  filterOption.style.visibility = 'hidden';
}

// Event listener on each country item
export function renderSelectedCountry(countryData, data, countriesPerPage) {
  const flagList = document.querySelectorAll('.list-div');
  flagList.forEach(list =>
    list.addEventListener('click', e => {
      if (e.target.classList.contains('fa')) return;

      const countryName =
        e.currentTarget.childNodes[3].firstElementChild.innerText;
      countryData.forEach(country => {
        if (countryName.toLowerCase() === country.name.common.toLowerCase()) {
          countryView(
            country.flags.png,
            country.name.common,
            country.name.nativeName,
            country.population,
            country.region,
            country.subregion,
            country.capital,
            country.tld,
            country.currencies,
            country.languages
          );
          const back = document.querySelector('.back');
          const countryViews = document.querySelector('.country-view');
          back.addEventListener('click', () => {
            countryViews.innerHTML = '';
            countryViews.style.display = 'none';
            // view._parentElement.innerHTML = '';
            getData(data);
            showSpecificPage(data, countriesPerPage);
            pagBtn.style.visibility = 'visible';
            favoriteCountryMark();
            initFavorites(favoriteState);
          });
        }
      });
    })
  );
}

export function countryBack(data, countriesPerPage) {}
