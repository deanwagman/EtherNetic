// Create a new AudioContext
export const audioContext = new AudioContext();

const playChimeNote = (noteFrequency, delay) => {
  audioContext = new AudioContext();

  if (!audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();

  oscillator.type = 'sine'; // Simple waveform
  oscillator.frequency.setValueAtTime(noteFrequency, audioContext.currentTime); // Set note frequency
  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime + delay);
  oscillator.stop(audioContext.currentTime + delay + 0.5); // Let each note play for 0.5 seconds
};

export const startupChime = () => {
  playChimeNote(261.63, 0); // C note
  playChimeNote(293.66, 0.5); // D note
  playChimeNote(329.63, 1); // E note
  playChimeNote(392.0, 1.5); // G note
};

export const playFeedSound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'square'; // Square wave
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Value in hertz (A4 note)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Play for 0.5 seconds
};

export const playSleepSound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle'; // Triangle wave for a softer sound
  oscillator.frequency.setValueAtTime(262, audioContext.currentTime); // Value in hertz (Middle C)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 2); // Play for 2 seconds
};

export const playDeathSound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine'; // Sine wave
  oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // Value in hertz (Low A)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1); // Play for 1 second
};

export const playHappySound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // Value in hertz (C5)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.7);
};

export const playAngrySound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(110, audioContext.currentTime); // Value in hertz (Low A)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
};

export const playPlayfulSound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(587, audioContext.currentTime); // Value in hertz (D5)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);
};

export const playSickSound = () => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(98, audioContext.currentTime); // Value in hertz (Low B)
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1);
};
