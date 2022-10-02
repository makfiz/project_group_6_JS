import { refs } from './refs';

export const modalBtnRefs = {
  addWatched: { text: 'ADD TO WATCHED', action: 'add' },
  removeWatched: { text: 'REMOVE FROM WATCHED', action: 'remove' },
  addQueue: { text: 'ADD TO WATCHED', action: 'add' },
  removeQueue: { text: 'REMOVE FROM WATCHED', action: 'remove' },
};

export function addModalBtn(action1, btnText1, action2, btnText2) {
  return (refs.modalBtns.innerHTML = `  
        <button class="modal_card_btn is-active wached" data-watched="${action1}">
            ${btnText1}
        </button>
        <button class="modal_card_btn queue" data-qeue="${action2}">
            ${btnText2}
        </button>`);
}
