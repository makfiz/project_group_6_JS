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
      console.log(data)

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
      console.log(data)

      return data;
    } catch (error) {
      console.log(error);
    }
  }


   async postMovieToLibraryWached (id, user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${user}/library/wached/${id}.json`,
                          data: {
                            id: `${id}`,
                              }
                            });;
                              
      Loading.remove();
      return data;
    } catch (error) {
      console.log(error);
    }
  }


 async postMovieToLibraryQueue (id, user) {
    try {
      Loading.circle({
        svgColor: '#ff6b08',
      });
      const { data } = await axios({
                          method: 'patch',
                          url: `${this.fbBaseUrl}users/${user}/library/queue/${id}.json`,
                          data: {
                            id: `${id}`,
                              }
                            });;
                              
      Loading.remove();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
