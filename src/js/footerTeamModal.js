import * as basicLightbox from 'basiclightbox';
import ImgTeam from '../images/team-modal/ImgTeam.jpeg';
import spriteSvg from '../images/sprite.svg';
import { teamArr } from './teamDada';

const container = document.querySelector('.team-modal');

container.addEventListener('click', openModal);

function renderTeamModal() {
  return teamArr
    .map(teamMember => {
      return `<div class="team-card">
         <img src="${teamMember.image}" alt="Maksym" class="team-image">
         <p class="team-name">${teamMember.name}</p>
         <p class="team-role">${teamMember.position}</p>
         <a href="${teamMember.github}" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
           <use href="${spriteSvg}#github"></use>
         </svg></a>
     </div>`;
    })
    .join('');
}
// console.log(renderTeamModal());
const teamModal = `
<div class="team-list">
${renderTeamModal()}
</div>`;

const modal = basicLightbox.create(teamModal);

function openModal(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
