import * as basicLightbox from 'basiclightbox';
import ImgTeam from '../images/team-modal/ImgTeam.jpeg';
import spriteSvg from '../images/sprite.svg';
import ImgMaks from '../images/team-modal/Maks.jpg';
import ImgKate from '../images/team-modal/Kateryna.jpg';
import ImgAndrii from '../images/team-modal/Andrii.jpg';
import ImgAnton from '../images/team-modal/Anton.jpg';
import ImgIllya from '../images/team-modal/Ilya.jpg';
import ImgVolodymyr from '../images/team-modal/Volodymyr.jpg';
import ImgYurii from '../images/team-modal/Yurii.jpg';
import ImgGeo from '../images/team-modal/Geo.jpg';
import ImgAleks from '../images/team-modal/Aleks.jpg';
import ImgNata from '../images/team-modal/Natalya.jpg';
import ImgLina from '../images/team-modal/Alina.jpg';

const container = document.querySelector('.team-modal');

container.addEventListener('click', openModal);

const teamModal = `<div class="team-list">
<div class="team-card">
    <img src="${ImgMaks}" alt="Maksym" class="team-image">
    <p class="team-name">Maksym</p>
    <p class="team-role">Team Lead</p>
    <a href="https://github.com/makfiz" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgKate}" alt="Kateryna" class="team-image">
    <p class="team-name">Kateryna</p>
    <p class="team-role">Scrum Master</p>
    <a href="https://github.com/Ekaterina-Kazantseva" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgAndrii}" alt="Andrii" class="team-image">
    <p class="team-name">Andrii</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/syniuk-a" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgAnton}" alt="Anton" class="team-image">
    <p class="team-name">Anton</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Ex0rc1st" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgLina}" alt="Alina" class="team-image">
    <p class="team-name">Alina</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Alialinaa19" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgIllya}" alt="Illya" class="team-image">
    <p class="team-name">Illya</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/illia-RD" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgVolodymyr}" alt="Vladymyr" class="team-image">
    <p class="team-name">Vladymyr</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Volodymyr-Bezyk" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgAleks}" alt="Aleksandr" class="team-image">
    <p class="team-name">Aleksandr</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/Aleks-corp" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgYurii}" alt="Yurii" class="team-image">
    <p class="team-name">Yurii</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/yuriipanasiuk" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgNata}" alt="Natalia" class="team-image">
    <p class="team-name">Natalia</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/NataliaMartynuik" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
<div class="team-card">
    <img src="${ImgGeo}" alt="George" class="team-image">
    <p class="team-name">George</p>
    <p class="team-role">Developer</p>
    <a href="https://github.com/WrWl" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">
      <use href="${spriteSvg}#github"></use>
    </svg></a>
</div>
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