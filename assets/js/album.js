const title = document.getElementsByClassName("title");
const cover = document.getElementsByClassName("cover");
const artista = document.getElementsByClassName("artista");
const autore = document.getElementsByClassName("autore");
const anno = document.getElementsByClassName("anno");
const nbrani = document.getElementsByClassName("nbrani");
const durata = document.getElementsByClassName("durata");
const music = document.getElementsByClassName("music")[0];
const playertitle = document.getElementById("playertitle");
const artistname = document.getElementById("artistname");
const coverimg = document.getElementById("coverimg");
const audio = document.getElementById("audio");
const stopButton = document.getElementById("stopButton");

const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId"); // per rendere l' album in arrivo variabile
console.log("EVENTID?", eventId);

const canzoni = function (array) {
  cautore = document.getElementsByClassName("cautore");
  array.forEach((element, i) => {
    const addmusic = document.createElement("div");
    addmusic.classList.add("insieme");
    addmusic.innerHTML = ` <div
    class="d-flex justify-content-between mt-2 align-items-center text-spotifyQuartary nplayer hoverBgLightDark"
    >
    <div class="d-flex align-items-center w-25">
    <div><h2 class="d-none d-sm-block me-3 ms-2 hoverWhite yournumber">${
      i + 1
    }</h2></div>
    <div>
    <h6 class="mb-0 pb-0 text-white mt-2">${element.title}</h6>
    <a href="" class="link-underline link-underline-opacity-0 text-spotifyQuartary pt-0 mt-0 hoverWhite cautore">${
      element.artist.name
    }</a>
    </div>
    </div>
    <h5 class="d-none d-sm-block ms-4 hoverWhite">${element.rank}</h5>
    <h5 class="d-none d-sm-block me-4 hoverWhite">${element.duration}</h5>
    
    <i
    class="d-sm-none bi bi-three-dots-vertical m-2 h2 icon"
    ></i>
    </div>
    `;

    music.appendChild(addmusic);
  });
};

const getAPI = function () {
  fetch(url + eventId)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((Album) => {
      console.log(Album);
      title[0].innerText = Album.title;
      cover[0].src = Album.cover;
      artista[0].src = Album.artist.picture;
      artista[1].src = Album.artist.picture;
      autore[0].innerText = Album.artist.name;
      autore[0].href = "./artist.html?eventId=" + Album.artist.id;
      autore[1].innerText = Album.artist.name;
      autore[1].href = "./artist.html?eventId=" + Album.artist.id;
      anno[0].innerText = Album.release_date;
      anno[1].innerText = Album.release_date;
      nbrani[0].innerText = Album.nb_tracks + " brani";
      durata[0].innerText = Album.duration;
      const ncanzoni = Album.tracks.data;
      console.log(ncanzoni);
      canzoni(ncanzoni);

      for (let i = 0; i < cautore.length; i++) {
        cautore[i].href = "./artist.html?eventId=" + Album.artist.id;
      }

      const svuota = function () {
        playertitle.innerText = "";
        artistname.innerText = "";
        coverimg.src = "";
        audio.src = "";
      };

      const invia = function (index) {
        svuota();
        playertitle.innerText = Album.tracks.data[index].title;
        artistname.innerText = Album.tracks.data[index].artist.name;
        coverimg.classList.remove("d-none");
        coverimg.src = Album.tracks.data[index].album.cover;
        audio.src = Album.tracks.data[index].preview;
        audio.play();
      };

      document.querySelectorAll(".insieme").forEach((element, index) => {
        element.dataset.index = index;
        element.addEventListener("click", function () {
          invia(index);
        });
      });
    })

    .catch((err) => {
      console.log("ERRORE!", err);
    });
};
getAPI();

const stopAudio = function () {
  stopButton.style.marginRight = "5px";
  stopButton.style.cursor = "pointer";
  if (audio.paused) {
    audio.play();
    stopButton.innerText = "Stop";
  } else {
    audio.pause();
    stopButton.innerText = "Play";
  }
};

stopButton.addEventListener("click", stopAudio);
