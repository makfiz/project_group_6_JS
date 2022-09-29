import { ApiServise } from './js/apiServise';
import { pagination, preventDefaultForLinks } from './js/pagination';

export const instance = new ApiServise();

async function abc() {
  await instance.fetchTrendingMovies();
  await pagination(instance);
  preventDefaultForLinks();
}

abc();
