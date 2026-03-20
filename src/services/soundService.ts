import { Howl } from 'howler';

// High-quality, subtle sound assets
const sounds = {
  ambient: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-soft-ambient-pad-2280.mp3'], // Placeholder for a very soft ambient sound
    loop: true,
    volume: 0.1,
  }),
  click: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-click-button-1481.mp3'],
    volume: 0.3,
  }),
  hover: new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-soft-pop-up-2191.mp3'],
    volume: 0.1,
  }),
};

let isAmbientPlaying = false;

export const SoundManager = {
  playAmbient: () => {
    if (!isAmbientPlaying) {
      sounds.ambient.play();
      isAmbientPlaying = true;
    }
  },
  playClick: () => {
    sounds.click.play();
  },
  playHover: () => {
    sounds.hover.play();
  },
};
