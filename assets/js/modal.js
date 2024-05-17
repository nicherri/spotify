// fetch
const BASE_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const inputSearch = document.querySelector("#modalSearch input");
const searchParameter = inputSearch.value;

// randomIndex
const getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// copia dell'array filtrando per proprietà
function extractProperties(array, property) {
  return array.map((item) => item[property]);
}

// clearModal
const clearModal = function (element) {
  const container = document.getElementById(element);
  container.innerHTML = "";
};

// search
inputSearch.addEventListener("input", function (event) {
  getInputValue();
  modalContent();
});

// modal launcher
search.addEventListener("click", () => {
  let modal = new bootstrap.Modal(document.getElementById("modalSearch"), {
    backdrop: "static",
    keyboard: false,
  });
  modal.show();
});

// modalInput.value
function getInputValue() {
  const inputSearch = document.querySelector("#modalSearch input");
  return inputSearch.value;
}

const generateModalSong = function (tracksArray) {
  const songContainer = document.getElementById("songContainer");
  clearModal("songContainer");
  const limit = Math.min(tracksArray.length, 4);

  for (let i = 0; i < limit; i++) {
    const track = tracksArray[i];
    const card = document.createElement("div");
    card.classList.add("col", "artistCardWrapper", "text-center", "mb-3");
    card.innerHTML = `
        <div class="mb-2">
        <a href="album.html?eventId=${track.album.id}">
          <img
            src="${track.album.cover_medium}"
            class="img-fluid"
            alt="una foto dell'album in cui è contenuta la canzone"
          />
          </a>
        </div>
        <div">
          <h5>${track.title_short}</h5>
          <a href="artist.html?eventId=${track.artist.id}"><h6 class="text-spotifyQuartary">${track.artist.name}</h6></a>
        </div>
      `;
    songContainer.appendChild(card);
  }
};

const generateModalArtist = function (tracksArray) {
  const songContainer = document.getElementById("artistContainer");
  clearModal("artistContainer");
  const addedArtist = [];
  const limit = Math.min(tracksArray.length, 4);

  for (let i = 0; i < limit; i++) {
    const track = tracksArray[i];
    if (!addedArtist.includes(track.artist.name)) {
      const card = document.createElement("div");
      card.classList.add("col", "artistCardWrapper", "text-center", "mb-3");
      card.innerHTML = `
          <div class="mb-2">
          <a href="artist.html?eventId=${track.artist.id}">
            <img
              src="${track.artist.picture_medium}"
              class="img-fluid"
              alt="una foto dell'artista"
            />
            </a>
          </div>
          <div">
          <a href="artist.html?eventId=${track.artist.id}"><h5>${track.artist.name}</h5></a>
            <h6 class="text-spotifyQuartary">Artista</h6>
          </div>
        `;

      songContainer.appendChild(card);
      addedArtist.push(track.artist.name);
    }
  }
};

const generateModalAlbum = function (tracksArray) {
  const songContainer = document.getElementById("albumContainer");
  clearModal("albumContainer");
  const addedAlbumIds = [];
  const limit = Math.min(tracksArray.length, 4);

  for (let i = 0; i < limit; i++) {
    const track = tracksArray[i];
    if (!addedAlbumIds.includes(track.album.id)) {
      const card = document.createElement("div");
      card.classList.add("col", "albumCardWrapper", "text-center", "mb-3");
      card.innerHTML = `
      <a href=""></a>
          <div class="mb-2">
          <a href="album.html?eventId=${track.album.id}">
            <img
              src="${track.album.cover_medium}"
              class="img-fluid"
              alt="una foto dell'album"
            />
          </div>
          <div">
          <a href="album.html?eventId=${track.album.id}"><h5>${track.album.title}</h5></a>
            <a href="artist.html?eventId=${track.artist.id}"><h6 class="text-spotifyQuartary">${track.artist.name}</h6></a>
          </div>
        `;

      songContainer.appendChild(card);
      addedAlbumIds.push(track.album.id);
    }
  }
};

// modal content
const modalContent = function () {
  fetch(`${BASE_URL}${getInputValue()}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        switch (response.status) {
          case 400:
            throw new Error(
              "La richiesta non può essere soddisfatta a causa di errori di sintassi"
            );
          case 401:
            throw new Error("Non autorizzato");
          case 402:
            throw new Error("Pagamento richiesto");
          case 403:
            throw new Error("Accesso vietato");
          case 404:
            throw new Error("La risorsa richiesta non è stata trovata");
          case 405:
            throw new Error("Metodo non consentito");
          case 406:
            throw new Error("Contenuto non accettabile");
          case 407:
            throw new Error("Autenticazione del proxy richiesta");
          case 408:
            throw new Error("Timeout della richiesta");
          case 409:
            throw new Error("Conflitto");
          case 410:
            throw new Error("Risorsa non disponibile");
          case 411:
            throw new Error("Lunghezza richiesta richiesta");
          case 412:
            throw new Error("Fallimento della precondizione");
          case 413:
            throw new Error("Entità della richiesta troppo grande");
          case 414:
            throw new Error("URI della richiesta troppo lungo");
          case 415:
            throw new Error("Tipo di media non supportato");
          case 416:
            throw new Error("Intervallo richiesto non soddisfacibile");
          case 417:
            throw new Error("Fallimento dell'aspettativa");
          case 418:
            throw new Error("Sono una teiera");
          case 420:
            throw new Error("Migliora la tua calma");
          case 422:
            throw new Error("Entità non elaborabile");
          case 426:
            throw new Error("Aggiornamento richiesto");
          case 429:
            throw new Error("Troppe richieste");
          case 431:
            throw new Error("Intestazioni della richiesta troppo grandi");
          case 449:
            throw new Error("Riprova con");
          case 451:
            throw new Error("Non disponibile per motivi legali");
          case 500:
            throw new Error("Errore interno del server");
          case 501:
            throw new Error("Non implementato");
          case 502:
            throw new Error("Gateway non valido");
          case 503:
            throw new Error("Servizio non disponibile");
          case 504:
            throw new Error("Timeout del gateway");
          case 505:
            throw new Error("Versione HTTP non supportata");
          case 509:
            throw new Error("Limite di banda superato");
          default:
            throw new Error("Errore non gestito: " + response.status);
        }
      }
    })
    .then((array) => {
      console.log("Array:", array.data);
      generateModalSong(array.data);
      generateModalArtist(array.data);
      generateModalAlbum(array.data);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

/*
const generateModalArtist = function () {};
const generateModalAlbum = function () {};
const clearModal = function () {};

*/
