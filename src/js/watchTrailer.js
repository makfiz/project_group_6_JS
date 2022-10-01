// import { ApiServise } from './apiServise';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

// const openVideoBtn = document.querySelector('.open__video_bnt');

// openVideoBtn.addEventListener('click', createVideo);

// async function createVideo() {
//   const newApi = new ApiServise();

//   const res = await newApi.fetchOpenMovieByPlayer();
//   console.log('res', res);
//   const results = res.results[0].key;

//   const player = basicLightbox.create(
//     ` <iframe
//   width="880"
//   height="495"
//   src="https://www.youtube.com/embed/${results}"
//   title="YouTube video player"
//   frameborder="0"
//   autoplay = "1"
//   allow="accelerometer; allowfullscreen = false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen
// ></iframe>
//       </br>
//       <button type="button" class="videoBtnClose">Close Trailer</i></button>
//     `,
//     {
//       onShow: player => {
//         player.element().querySelector('.videoBtnClose').onclick = player.close;
//         return player;
//       },
//     }
//   );

//   player.show();

//   window.addEventListener('keydown', closeTrailer);

//   function closeTrailer(e) {
//     if (e.code === 'Escape') {
//       player.close();
//       window.addEventListener('keydown', closeTrailer);
//     }
//   }
// }
