import { data } from './data.js';
import { toMinAndSec } from './utils.js';

const AudioController = {
   state: {
      audios: [],
      current: {},
   },

   init() {
      this.initVariables();
      this.renderAudios();
      this.initEvents();
   },

   initVariables() {
      this.audioList = document.querySelector('.items');
   },

   initEvents() {
      this.audioList.addEventListener('click', this.handleItem.bind(this));
   },

   renderCurrentItem() {},

   setCurrentItem(itemId) {
      const current = this.state.audios.find(({ id }) => +id === +itemId);

      if (!current) return;
   },

   handleItem({ target }) {
      const { id } = target.dataset;

      if (!id) return;

      this.setCurrentItem(id);
   },

   renderItem({ id, link, group, track, duration, genre }) {
      const [image] = link.split('.');

      return `
         <div class="item" data-id="${id}">
            <div class="item-image" style="background-image: url(./assets/images/${image}.jpg)"></div>

            <div class="item-titles">
               <h2 class="item-group">${group}</h2>
               <h3 class="item-track">${track}</h3>
            </div>

            <p class="item-duration">${toMinAndSec(duration)}</p>

            <p class="item-genre">${genre}</p>

            <button class="item-play">
               <svg class="icon-play">
                  <use xlink:href="./assets/images/sprite.svg#play"></use>
               </svg>
            </button>
         </div>
      `;
   },

   loadAudioData(audio) {
      this.audioList.innerHTML += this.renderItem(audio);
   },

   renderAudios() {
      data.forEach((item) => {
         const audio = new Audio(`./assets/audio/${item.link}`);

         audio.addEventListener('loadeddata', () => {
            const newItem = { ...item, duration: audio.duration, audio };
            this.state.audios.push(newItem);
            this.loadAudioData(newItem);
         });
      });
   },
};

AudioController.init();
