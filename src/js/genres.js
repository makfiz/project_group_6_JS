import genres from './genresData.json';
import { refs } from './refs';

function getListOfGenres(obj) {
    const genresItem = obj.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
refs.listOfGenres.insertAdjacentHTML('beforeend', genresItem)
}
getListOfGenres(genres);

