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

      return data.results;
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
        },
      });
      Loading.remove();

      if (this.searchQuery === '') {
        return;
      }

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
}
