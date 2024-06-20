export function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
