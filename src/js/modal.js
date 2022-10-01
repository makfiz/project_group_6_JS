import { refs} from './refs';

const details = {
    filmTitle: document.querySelector('.film_title'),
    largePoster: document.querySelector('source.large'),
    mediumPoster: document.querySelector('source.medium'),
    smallPoster: document.querySelector('source.small'),
    poster: document.querySelector('img[alt="moviesPoster"]'),
    voteAverage: document.querySelector('.vote_average'),
    voteCount: document.querySelector('.vote_count'),
    popularity: document.querySelector('.popularity'),
    originalTitle: document.querySelector('.original_title'),
    genres: document.querySelector('.genres'),
    description: document.querySelector('.description'),
    toHide: document.querySelector("[data-modal]"),
    toCloseModal: document.querySelector(".close-btn"),
  };
  details.toCloseModal.addEventListener('click', toggleModal);
refs.movieList.addEventListener('click', clickOnFilm);
const API_KEY = 'e4c439da3c1d90110fb4595b6236c9fe';

function toggleModal() {
    details.toHide.classList.toggle("is-hidden");
  }

function clickOnFilm(e) {
    // console.log(e.path)
    console.log(e.path[3].getAttribute("data-id"));
    toggleModal(e)
let movieID = e.path[3].getAttribute("data-id");

    fetch(`https://api.themoviedb.org/3/movie/${movieID}$?api_key=${API_KEY}&$&language=en-US`).then(response =>{
        return response.json();})
        .then(info => {
            const i = [];
            for (const genre of info.genres) {
                i.push(genre.name);
              }
            console.log(info);
            details.filmTitle.textContent = info.title;
            details.voteAverage.textContent = info.vote_average;
            details.voteCount.textContent = info.vote_count;
            details.popularity.textContent = info.popularity;
            details.originalTitle.textContent = info.original_title;
            details.genres.textContent = i;
            details.description.textContent = info.overview;
            details.poster.src = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
            // details.largePoster.srcset = `https://image.tmdb.org/t/p/w1024${info.poster_path}`;
            // details.mediumPoster.srcset = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
            // details.smallPoster.srcset = `https://image.tmdb.org/t/p/w320${info.poster_path}`;
             
        }).catch (error =>{
            console.log(error);  
        });
};