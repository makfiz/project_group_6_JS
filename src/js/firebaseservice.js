import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
export class FirebaseService {
    constructor() {
        axios.defaults.baseURL = 'https://filmoteka-29879-default-rtdb.europe-west1.firebasedatabase.app/';
        this.user = null
    }

    get user() {
    return this.user;
  }

    set user(newUser) {
    this.user = newUser;
  }


 async userReg (user) {
    try {
      const { data } = await axios({
                          method: 'patch',
                          url: `users/${user.displayName}.json`,
                          data: {
                            user: `${user.displayName}`,
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
      const { data } = await axios(`/${this.user}/library.json`);

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
                          url: 'library.json',
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