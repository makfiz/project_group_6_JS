// import axios from 'axios';

// export async function getGenres() {
//     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=e4c439da3c1d90110fb4595b6236c9fe`;
//     const response = await axios.get(url);
//     console.log(response)
//     return response.data;
//     };
// const listOfGengers = document.querySelector('#genres')
// export async function renderGenresList() {

//     const resp = await getGenres();
//     const genresItems = resp.genres.map(({ name }) => {
//     return `<option value="${name}">${name}</option>`
//     }).join('');
//     listOfGengers.insertAdjacentHTML('beforeend', genresItems)
// }
// renderGenresList()


const listOfGengers = document.querySelector('#genres')
const genres = [
{id: 28, name: "Action"},
{id: 12, name: "Adventure"},
{id: 16, name: "Animation"},
{id: 35, name: "Comedy"},
{id: 80, name: "Crime"},
{id: 99, name: "Documentary"},
{id: 18, name: "Drama"},
{id: 10751, name: "Family"},
{id: 14, name: "Fantasy"},
{id: 36, name: "History"},
{id: 27, name:  "Horror"},
{id: 10402, name: "Music"},
{id: 9648, name: "Mystery"},
{id: 10749, name: "Romance"},
{id: 878, name: "Science Fiction"},
{id: 10770, name: "TV Movie"},
{id: 53, name: "Thriller"},
{id: 10752, name: "War"},
{id: 37, name: "Western"},
]

function getListOfGenres(obj) {
    const gengersItem = obj.map(({ name }) => {
    return `<option value="${name}">${name}</option>`
}).join('');
listOfGengers.insertAdjacentHTML('beforeend', gengersItem)
}
getListOfGenres(genres);