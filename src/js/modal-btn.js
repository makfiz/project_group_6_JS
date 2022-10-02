import { refs } from './refs';
const { wached, queue } = refs;
export const modalBtnRefs = {
  addWatched: { text: 'ADD TO WATCHED', act: 'add' },
  removeWatched: { text: 'REMOVE FROM WATCHED', act: 'remove' },
  addQueue: { text: 'ADD TO QUEUE', act: 'add' },
  removeQueue: { text: 'REMOVE FROM QUEUE', act: 'remove' },
};

// export function addModalBtn() {
//   const { addWatched, removeWatched, addQueue, removeQueue } = modalBtnRefs;

// }
