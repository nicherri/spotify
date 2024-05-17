// play/pause
const playPauseIcons = function () {
  const play = document.getElementsByClassName("bi-play-circle-fill")[0];
  const pause = document.getElementsByClassName("bi-pause-circle-fill")[0];

  play.addEventListener("click", () => {
    play.classList.add("d-none");
    pause.classList.remove("d-none");
    audio.play();
  });

  pause.addEventListener("click", () => {
    pause.classList.add("d-none");
    play.classList.remove("d-none");
    audio.pause();
  });
};

// repeatIcon
const repeatIcons = function () {
  const repeat = document.getElementsByClassName("bi-repeat")[0];
  const repeat1 = document.getElementsByClassName("bi-repeat-1")[0];

  repeat.addEventListener("click", () => {
    if (repeat.classList.contains("clicked")) {
      repeat.classList.add("d-none");
      repeat1.classList.remove("d-none");
    } else {
      repeat.classList.add("clicked");
      repeat.classList.remove("hoverWhite");
    }
  });

  repeat1.addEventListener("click", () => {
    repeat1.classList.add("d-none");
    repeat.classList.remove("d-none");
    repeat.classList.remove("clicked");
    repeat.classList.add("hoverWhite");
  });
};

const clicked = function () {
  const icons = document.querySelectorAll(
    ".bi-shuffle, .bi-file-play, .bi-body-text, .bi-music-note-list, .bi-hdd-network"
  );

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Se l'icon ha la classe "clicked", la rimuove ed aggiunge "hoverWhite"
      if (icon.classList.contains("clicked")) {
        icon.classList.remove("clicked");
        icon.classList.add("hoverWhite");
      } else {
        // Altrimenti, aggiunge "clicked" e rimuove "hoverWhite"
        icon.classList.add("clicked");
        icon.classList.remove("hoverWhite");

        // Rimuove "clicked" e aggiunge "hoverWhite" alle altre icons
        icons.forEach((otherIcon) => {
          if (otherIcon !== icon && otherIcon.classList.contains("clicked")) {
            otherIcon.classList.remove("clicked");
            otherIcon.classList.add("hoverWhite");
          }
        });
      }
    });
  });
};

// volumeIcons
const volumeIcons = function () {
  const volumeBar = document.getElementById("volumeBar");
  const mute = document.getElementsByClassName("bi-volume-mute")[0];
  const volumeDown = document.getElementsByClassName("bi-volume-down")[0];
  const volumeUp = document.getElementsByClassName("bi-volume-up")[0];

  volumeBar.addEventListener("input", (event) => {
    const volume = event.target.value;
    console.log("volume:", volume);

    // Cambia l'icona del volume in base al livello del volume
    if (volume == 0) {
      mute.classList.remove("d-none");
      volumeDown.classList.add("d-none");
      volumeUp.classList.add("d-none");
    } else if (volume > 0 && volume <= 0.5) {
      mute.classList.add("d-none");
      volumeDown.classList.remove("d-none");
      volumeUp.classList.add("d-none");
    } else {
      mute.classList.add("d-none");
      volumeDown.classList.add("d-none");
      volumeUp.classList.remove("d-none");
    }

    // Imposta il volume di un elemento audio
    const audio = document.getElementById("audio");
    audio.volume = volume;
  });
};

const player = function () {
  clicked();
  playPauseIcons();
  repeatIcons();
  volumeIcons();
};

document.addEventListener("DOMContentLoaded", () => {
  player();
});
