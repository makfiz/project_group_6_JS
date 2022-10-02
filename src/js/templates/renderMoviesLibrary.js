import genresData from '../../js/genresData.json';
import { refs } from '../refs';


export function makeGallaryLibrary(movies) {
  // console.log(movies)

  if (movies == null) {
    refs.galleryLibrary.innerHTML = `<span style=" margin-left: auto;
       margin-right: auto;font-size: 30px;
    line-height: 1.19; color: #ff6b08;">Your library is empty ;(</span>`;
    
    return
  }

  let temp = [];
  for (key in movies) {
    // console.log(movies[key])
    const { id, poster_path, title, release_date, ganre, vote_average } = movies[key]
    

      let releaseDate = release_date;

      if (releaseDate === undefined) {
        releaseDate = '2022';
      } else {
        releaseDate = release_date.slice(0, 4);
      }
     
    let filmsGanres = ganre.replace(/,/g, ', ')
   
      let image = `https://image.tmdb.org/t/p/w400/${poster_path}`;
      if (poster_path === null) {
        image =
          'https://dummyimage.com/400x600/7d7d7d/fff.jpg&text=image+not+found';
      }

      temp.push(
       ` <li class="gallery__item" data-id = ${id}>
            <div class="gallery-card">
              <div class="gallery-card__main">
                <img
                  src="${image}"
                  alt="${title}"
                  class="gallery-card__img"
                />
                <span class="gallery-card__rating"> ${
                  vote_average || '-'
                } </span>
              </div>
              <div class="gallery-card__content">
                <h3 class="gallery-card__title">${title}</h3>
                <p class="gallery-card__description">
                  <span class="gallery-card__genre">
                    ${filmsGanres || 'Action'}  |
                    <span class="gallery-card__date">
                      ${releaseDate}</span>
                  </span>
                </p>
              </div>
            </div>
          </li>`)
  
  } 
  refs.galleryLibrary.innerHTML = temp.join();
}
