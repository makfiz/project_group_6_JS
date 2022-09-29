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
    const emailCut = user.email.split('@')[0]
   try {
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${emailCut}.json`,
                          data: {
                            nickname: `${user.displayName}`,
                            email: `${user.email}`,
                            library: {}
                              }
                            });;
    } catch (error) {
      console.log(error);
    }
  }


   async GetUserLibrary () {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios(`${this.fbBaseUrl}users/${this.user}/library.json`);

      Loading.remove();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

   async postMovieToLibrary (id, original_title) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios({
                          method: 'post',
                          url: `${this.fbBaseUrl}users/${this.user}/library.json`,
                          data: {
                            id: `${id}`,
                            original_title: `${original_title}`,
                            watched: false
                              }
                            });;
                              
      Loading.remove();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}