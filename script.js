import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const resultsContainer = document.getElementById('results');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
    const query = searchBox.value.trim();

    if (query === '') {
        clearResults();
        return;
    }

    fetchCountries(query)
        .then(countries => {
            clearResults();

            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (countries.length >= 2 && countries.length <= 10) {
                displayCountryList(countries);
            } else if (countries.length === 1) {
                displayCountryDetails(countries[0]);
            }
        })
        .catch(error => {
            clearResults();
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
}

function clearResults() {
    resultsContainer.innerHTML = '';
}

function displayCountryList(countries) {
    countries.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.classList.add('country');
        countryElement.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" />
            <span>${country.name.official}</span>
        `;
        resultsContainer.appendChild(countryElement);
    });
}

function displayCountryDetails(country) {
    const countryElement = document.createElement('div');
    countryElement.classList.add('country');
    countryElement.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" />
        <h2>${country.name.official}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
    `;
    resultsContainer.appendChild(countryElement);
}
