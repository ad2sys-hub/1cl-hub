import { useCallback, useRef } from 'react';

const sounds = {
  hover: 'https://raw.githubusercontent.com/arwes/arwes/next/static/assets/sounds/info.mp3',
  click: 'https://raw.githubusercontent.com/arwes/arwes/next/static/assets/sounds/click.mp3',
  drone: 'https://raw.githubusercontent.com/Harsha-code-per/decode-somnia/main/public/audio/ambient_drone.mp3'
};

export const useSound = () => {
  const hoverAudio = useRef(new Audio(sounds.hover));
  const clickAudio = useRef(new Audio(sounds.click));
  const droneAudio = useRef(new Audio(sounds.drone));

  const playSound = useCallback((type: keyof typeof sounds) => {
    let audio: HTMLAudioElement;
    
    switch (type) {
      case 'hover':
        audio = hoverAudio.current;
        audio.volume = 0.3;
        break;
      case 'click':
        audio = clickAudio.current;
        audio.volume = 0.5;
        break;
      case 'drone':
        audio = droneAudio.current;
        audio.volume = 0.15;
        audio.loop = true;
        break;
      default:
        return;
    }

    if (audio) {
      // For short interactive sounds, reset to start to allow rapid fire
      if (type !== 'drone') {
        audio.currentTime = 0;
      }
      
      audio.play().catch(e => {
        // Autoplay policy might block drone until first interaction
        if (type !== 'drone') console.warn(`Sound ${type} blocked:`, e);
      });
    }
  }, []);

  const stopSound = useCallback((type: keyof typeof sounds) => {
    if (type === 'drone') {
      droneAudio.current.pause();
    }
  }, []);

  return { playSound, stopSound };
};
