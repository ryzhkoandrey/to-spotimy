import { data } from './data.js';

const AudioController = {
   state: {
      audios: [],
   },

   init() {
      this.initVariables();
      this.renderAudios();
   },

   initVariables() {
      this.audioList = document.querySelector('.items');
   },

   loadAudioData(audio) {},

   renderAudios() {
      data.forEach((item) => {
         const audio = new Audio(`./assets/audio/${item.link}`);

         audio.addEventListener('loadeddata', () => {
            const newItem = { ...item, duration: audio.duration, audio };
            this.state.audios.push(newItem);
            loadAudioData(newItem);
         });
      });
   },
};

AudioController.init();
