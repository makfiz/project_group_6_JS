import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { ApiServise } from './apiServise';
import { refs } from './refs';
import { FirebaseService } from './firebaseservice';

const firebase = new FirebaseService();

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
  toHide: document.querySelector('[data-modal]'),
  toCloseModal: document.querySelector('.close-btn'),
  titleId: document.querySelector('.title_item_id'),
};
details.toCloseModal.addEventListener('click', toggleModal);
refs.movieList.addEventListener('click', clickOnFilm);
const API_KEY = 'e4c439da3c1d90110fb4595b6236c9fe';

function toggleModal() {
  details.toHide.classList.toggle('is-hidden');
}

const apiId = new ApiServise();

function clickOnFilm(e) {
  // console.log(e.path)

  console.log(e.path[3].getAttribute('data-id'));
  toggleModal(e);
  let movieID = e.path[3].getAttribute('data-id');

  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}$?api_key=${API_KEY}&$&language=en-US`
  )
    .then(response => {
      return response.json();
    })
    .then(info => {
      const i = [];
      for (const genre of info.genres) {
        i.push(genre.name);
      }

      apiId.movieId = movieID;
      console.log(apiId.movieId);
      console.log(info);
      details.titleId.innerHTML = movieID;
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
    })
    .catch(error => {
      console.log(error);
    });
}

//Open video player and watch trailer

refs.openVideoBtn.addEventListener('click', createVideo);

async function createVideo() {
  const res = await apiId.fetchOpenMovieByPlayer();
  const results = res.results[0].key;

  const player = basicLightbox.create(
    ` <iframe class = "video_frame"

  src="https://www.youtube.com/embed/${results}"
  title="YouTube video player"
  frameborder="0"
  autoplay = "1"
  allow="accelerometer; allowfullscreen = false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
      </br>
      <button type="button" class="videoBtnClose  is-hidden">Close Trailer</i></button>
    `,
    {
      onShow: player => {
        player.element().querySelector('.videoBtnClose').onclick = player.close;
        return player;
      },
    }
  );

  player.show();

  window.addEventListener('keydown', closeTrailer);
  const videoBtnClose = document.querySelector('.videoBtnClose');
  setTimeout(() => {
    videoBtnClose.classList.remove('is-hidden');
  }, 10000);

  function closeTrailer(e) {
    if (e.code === 'Escape') {
      player.close();
      window.addEventListener('keydown', closeTrailer);
    }
  }
}
