import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const API_KEY = 'e4c439da3c1d90110fb4595b6236c9fe';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export class ApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language;
    this.id = null;
    this.genreId = null;
    this.total_pages = 1000;
    this.currentMode = 'trending';
  }

  async fetchTrendingMovies() {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios('trending/movie/day', {
        params: {
          api_key: API_KEY,
          language: this.language,
          page: this.page,
        },
      });

      Loading.remove();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSearchMovie() {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios('search/movie', {
        params: {
          api_key: API_KEY,
          query: this.searchQuery,
          language: this.language,
          page: this.page,
        },
      });
      Loading.remove();

      if (this.searchQuery === '') {
        return;
      }
      this.total_pages = data.total_pages;

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSearchMovieById() {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`movie/${this.id}`, {
        params: {
          api_key: API_KEY,
          language: this.language,
        },
      });
      Loading.remove();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieByGenre() {
    try {
      Loading.pulse({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`discover/movie`, {
        params: {
          api_key: API_KEY,
          language: this.language,
          with_genres: this.genreId,
        },
      });
      Loading.remove();

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get movieId() {
    return this.id;
  }

  set movieId(newId) {
    this.id = newId;
  }

  get pages() {
    return this.page;
  }

  set pages(newPage) {
    this.page = newPage;
  }

  get totalPage() {
    return this.total_pages;
  }

  set totalPage(pages) {
    this.total_pages = pages;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get mode() {
    return this.currentMode;
  }
  set mode(newMode) {
    this.currentMode = newMode;
  }
}
