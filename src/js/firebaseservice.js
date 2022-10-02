import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export class FirebaseService {
    constructor() {
      this.user = 'user'
      this.fbBaseUrl = 'https://filmoteka-29879-default-rtdb.europe-west1.firebasedatabase.app/'
    }

    get username() {
    return this.user;
  }

    set username(newUser) {
      this.user = newUser;
  }


  
  async userReg(user) {
    const emailCut = user.email.split('@')[0].replace(/[^a-zа-яё\s]/gi, '');
   try {
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${emailCut}.json`,
                          data: {
                            nickname: `${user.displayName}`,
                            email: `${user.email}`,
                              }
                            });;
    } catch (error) {
      console.log(error);
    }
  }


   async GetUserQueue (user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`${this.fbBaseUrl}users/${user}/library/queue.json`);

      Loading.remove();
      // console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }

     async GetUserWached (user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`${this.fbBaseUrl}users/${user}/library/wached.json`);

      Loading.remove();
      // console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }


   async postMovieToLibraryWached (info, user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${user}/library/wached/${info.movieID}.json`,
                          data: {
                            id: `${info.movieID}`,
                            title: `${info.title}`,
                            vote_average: `${info.vote_average}`,
                            vote_count: `${info.vote_count}`,
                            original_title: `${info.original_title}`,
                            popularity: `${info.popularity}`,
                            overview: `${info.overview}`,
                            ganre: `${info.ganreString}`,
                            poster_path: `${info.poster_path}`,
                            
                              }
                            });;
                              
      Loading.remove();
      return data;
    } catch (error) {
      console.log(error);
    }
  }


 async postMovieToLibraryQueue (info, user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${user}/library/queue/${info.movieID}.json`,
                          data: {
                            id: `${info.movieID}`,
                            title: `${info.title}`,
                            vote_average: `${info.vote_average}`,
                            vote_count: `${info.vote_count}`,
                            original_title: `${info.original_title}`,
                            popularity: `${info.popularity}`,
                            overview: `${info.overview}`,
                            ganre: `${info.ganreString}`,
                            poster_path: `${info.poster_path}`,
                            
                              }
                            });;
                              
      Loading.remove();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async removeMovieToLibrary (info, user) {
      try {
        Loading.circle({
          svgColor: '#ff6b08',
        });
        const { data } = await axios({
                            method: 'delete',
                            url: `${this.fbBaseUrl}users/${user}/library/wached/${info.movieID}.json`,
                            data: {
                              id: `${info.movieID}`,
                              title: `${info.title}`,
                              vote_average: `${info.vote_average}`,
                              vote_count: `${info.vote_count}`,
                              original_title: `${info.original_title}`,
                              popularity: `${info.popularity}`,
                              overview: `${info.overview}`,
                              ganre: `${info.ganreString}`,
                              poster_path: `${info.poster_path}`,
                              
                                }
                              });;
                                
        Loading.remove();
        return data;
      } catch (error) {
        console.log(error);
      }
    }

 async getMovieToLibraryById (user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`${this.fbBaseUrl}users/${user}/library/wached/${info.movieID}.json`);

      Loading.remove();
      // console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
