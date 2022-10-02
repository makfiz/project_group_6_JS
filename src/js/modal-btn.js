import { refs } from './refs';
const { wached, queue } = refs;
export const modalBtnRefs = {
  addWatched: { text: 'ADD TO WATCHED', action: 'add' },
  removeWatched: { text: 'REMOVE FROM WATCHED', action: 'remove' },
  addQueue: { text: 'ADD TO QUEUE', action: 'add' },
  removeQueue: { text: 'REMOVE FROM QUEUE', action: 'remove' },
};

export function addModalBtn() {
  const { addWatched, removeWatched, addQueue, removeQueue } = modalBtnRefs;
  wached.textContent = addWatched.text;
  wached.dataset.action = addWatched.action;
  queue.textContent = addQueue.text;
  queue.dataset.action = addQueue.action;
}
