let shootSound, explosionLarge, explosionMedium, explosionSmall, thrustSound;
let soundsLoaded = false;

function loadSounds() {
  if (soundsLoaded) return;
  soundsLoaded = true;

  shootSound = new Audio('sounds/fire.wav');
  explosionLarge = new Audio('sounds/bangLarge.wav');
  explosionMedium = new Audio('sounds/bangMedium.wav');
  explosionSmall = new Audio('sounds/bangSmall.wav');
  thrustSound = new Audio('sounds/thrust.wav');
  thrustSound.loop = true;
}

window.addEventListener('keydown', loadSounds);

function playShoot() {
  if (!soundsLoaded) return;
  shootSound.currentTime = 0;
  shootSound.play();
}

function playExplosion(size) {
  if (!soundsLoaded) return;
  if (size === 60) {
    explosionLarge.currentTime = 0;
    explosionLarge.play();
  } else if (size === 30) {
    explosionMedium.currentTime = 0;
    explosionMedium.play();
  } else {
    explosionSmall.currentTime = 0;
    explosionSmall.play();
  }
}

function playThrust(active) {
  if (!soundsLoaded) return;
  if (active) {
    thrustSound.play();
  } else {
    thrustSound.pause();
    thrustSound.currentTime = 0;
  }
}