class Artist {
  constructor(_name, _picturexl, _nb_fan) {
    this.name = _name;
    this.picturexl = _picturexl;
    this.nb_fan = _nb_fan;
  }
}
const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('eventId');
// Assegno temporanemamete l'artista
//let eventId = 7520; // queen
console.log("ArtistId?", eventId);

const getArtistDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((artistData) => {
      console.log("Artist data:", artistData);

      // Creazione dell'oggetto Artista
      const artist = new Artist(
        artistData.name,
        artistData.picture_xl,
        artistData.nb_fan
      );

      // Inserimento dei dati nel DOM
      document.querySelectorAll(".artistName").forEach((el) => {
        el.innerText = artist.name;
      });

      // Carica l'immagine nell'elemento artImgUrl
      const artImgUrlElement = document.getElementById("artImgUrl");
      artImgUrlElement.src = artist.picturexl;

      // Chiama la funzione per applicare lo sfondo dalla immagine
      applyBackgroundFromImage(artist.picturexl, "headerSection");

      document.getElementById("numeroDiFan").innerText = `${(
        artist.nb_fan / 1000000
      ).toFixed(1)} Mln di ascolti mensili`;
    })
    .catch((error) => {
      console.error("Error fetching artist data:", error);
    });
};

getArtistDetails();

/// Funzione per estrarre i colori dominanti dall'immagine e applicarli come sfondo alla sezione
const applyBackgroundFromImage = function (imageUrl, sectionId) {
  console.log("Applying background from image...");

  // Creazione di un nuovo oggetto Color Thief
  const colorThief = new ColorThief();

  // Creazione di un'immagine nascosta per l'estrazione dei colori
  const imageElement = document.getElementById("artImgUrl");
  imageElement.crossOrigin = "Anonymous"; // Abilita il supporto CORS per evitare problemi con il caricamento dell'immagine
  imageElement.src = imageUrl;

  // Aspetta il caricamento completo dell'immagine
  imageElement.onload = function () {
    console.log("Image loaded successfully.");

    // Estrai il colore dominante dall'immagine
    const dominantColor = colorThief.getColor(imageElement);
    console.log("Dominant color:", dominantColor);

    // Calcola il colore secondario per creare un effetto gradiente
    const secondaryColor = `rgb(${dominantColor[0] + 50}, ${
      dominantColor[1] + 50
    }, ${dominantColor[2] + 50})`;

    // Applica il colore dominante come sfondo principale e il colore secondario come sfondo secondario alla sezione desiderata
    const section = document.getElementById(sectionId);
    if (section) {
      console.log("Applying gradient background to section:", sectionId);
      section.style.background = `linear-gradient(to bottom, rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}), ${secondaryColor})`;
    } else {
      console.error(`Section with id '${sectionId}' not found.`);
    }
  };

  // Gestisci eventuali errori di caricamento dell'immagine
  imageElement.onerror = function () {
    console.error("Error loading image:", imageUrl);
  };
};
/*
// Funzione per gestire lo scorrimento della pagina
const handleScroll = function (e) {
  const primaSezioneArtista = document.getElementById("primaSezioneArtista");
  const headerSection = document.getElementById("headerSection");
  const artImgUrlElement = document.getElementById("artImgUrl");
  const artistName2 = document.getElementById("artistName2");

  console.log("primaSezioneArtista", primaSezioneArtista);
  console.log(e);
  if (
    !primaSezioneArtista ||
    !headerSection ||
    !artImgUrlElement ||
    !artistName2
  ) {
    console.error("Element not found!");
    return;
  }

  const primaSezioneHeight = primaSezioneArtista.offsetHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  console.log(
    "ScrollY:",
    scrollY,
    "PrimaSezioneHeight:",
    primaSezioneHeight,
    "WindowHeight:",
    windowHeight
  );

  // Calcola l'opacità in base allo scorrimento
  let opacity = 1 - scrollY / primaSezioneHeight;
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;

  console.log("Calculated Opacity:", opacity);

  // Applica l'opacità alla sezione headerSection e all'immagine artImgUrl
  headerSection.style.opacity = 1 - opacity;
  artImgUrlElement.style.opacity = opacity;

  // Mostra il nome dell'artista quando primaSezioneArtista non è più visibile
  if (scrollY > primaSezioneHeight) {
    artistName2.style.display = "flex";
  } else {
    artistName2.style.display = "none";
  }
};

// Aggiungi l'evento di scorrimento
document
  .getElementsByClassName("col-7")[0]
  .addEventListener("scroll", handleScroll);
*/
class CanzoniPiuPopolari {
  constructor(
    title,
    pictureMedium,
    preview,
    duration,
    rank,
    albumTitle,
    albumCover,
    albumLink,
    albumId
  ) {
    this.title = title;
    this.pictureMedium = pictureMedium;
    this.preview = preview;
    this.duration = duration;
    this.rank = rank;
    this.albumTitle = albumTitle;
    this.albumCover = albumCover;
    this.albumLink = albumLink;
    this.albumId = albumId;
  }

  static fromJSON(data) {
    let albumId = null; // Inizializziamo l'ID dell'album a null
    if (data.album && data.album.id) {
      albumId = data.album.id; // Se l'ID dell'album è presente nei dati, lo assegniamo
    }
    return new CanzoniPiuPopolari(
      data.title,
      "https://path/to/images/" + data.picture_medium,
      data.preview,
      data.duration,
      data.rank,
      data.album.title,
      data.album.cover_small,
      data.album.link,
      albumId
    );
  }
}

const getTopSongs = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      eventId +
      "/top?limit=50"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Top songs:", data);

      // Filtra solo le prime 10 canzoni popolari
      const top10Songs = data.data.slice(0, 10);

      // Ordina le canzoni in base al rank (in ordine decrescente)
      const songs = top10Songs
        .map((songData) => CanzoniPiuPopolari.fromJSON(songData))
        .sort((a, b) => b.rank - a.rank);

      // Inserisci i dati delle canzoni nel DOM
      const cardContainer = document.getElementById("popularSongTotal");
      if (cardContainer) {
        // Funzione per mostrare le canzoni
        const showSongs = (songsToShow) => {
          cardContainer.innerHTML = "";
          songsToShow.forEach((song, index) => {
            cardContainer.innerHTML += `
                            <div class="d-flex align-content-center flex-wrap ps-3 me-2 align-items-center pointer" id="popularSongTotalSecondDiv">
                                <div id="firtSection" class="d-flex ">
                                    <div class="d-flex flex-row" id="number-play">
                                        <p id="numberSection" class="m-3 align-content-center">${
                                          index + 1
                                        }</p>
                                        <i class="bi bi-play d-none"></i>
                                    </div>
                                    <div id="imageSection" class="align-content-center">
                                        <img src="${
                                          song.albumCover
                                        }" width="auto" height="45" alt="Cover Song">
                                    </div>
                                </div>
                                <div class="d-flex flex-column flex-lg-row align-content-center ms-3" id="informationPopularSong">
                                    <div id="idTitle">
                                        <p id="title" class="align-content-center m-0 hoverUnderline pointer"><a class="text-white text-decoration-none" href="./album.html?eventId=${
                                          song.albumId
                                        }">${song.title}</a></p>
                                    </div>
                                    <div id="idReproductionNumber">
                                        <p id="reproductionNumber" class="align-content-center text-secondary m-0">${
                                          song.rank
                                        }</p>
                                    </div>
                                </div>
                                <div class=" d-flex flex-wrap align-content-center " id="ancillaryInformation">
                                    <div id="idAddToPlaylist">
                                        <p id="addToPlaylist" class="d-flex"> <i class="bi bi-plus-circle text-white me-4 "></i> </p>
                                        <p id="addToPlaylist" class="d-flex"> <i class="bi bi-check-circle-fill text-white text-spotifyQuartary d-none me-4 "></i> </p>
                                    </div>
                                    <div id="idsongDuration">
                                        <p id="songDuration" class="d-none d-lg-flex me-4">${Math.floor(
                                          song.duration / 60
                                        )}:${(song.duration % 60)
                                               .toString()
                                                 .padStart(2, "0")}</p>
                                    </div>
                                    <div>
                                        <p id="songDuration"> <i class="bi bi-three-dots text-white d-none d-lg-block bigicon"></i> <i class="bi bi-three-dots-vertical d-lg-none bigicon"></i></p>
                                    </div>
                                </div>
                            </div>`;
          });

          if (songsToShow.length >= 5 && songsToShow.length < 10) {
            cardContainer.innerHTML += `
              <button id="showAllButton" class="btn btn-spotifyPrimary text-spotifyQuartary hoverWhite text-start mb-3 d-none d-lg-block">Mostra tutto</button>
            `;
          }

          if (songsToShow.length === 10) {
            cardContainer.innerHTML += `
              <button id="showLessButton" class="btn btn-spotifyPrimary text-spotifyQuartary hoverWhite text-start mb-3">Mostra meno</button>
            `;
          }

          const showAllButton = document.getElementById("showAllButton");
          if (showAllButton) {
            showAllButton.addEventListener("click", () => {
              showSongs(songs);
            });
          }

          const showLessButton = document.getElementById("showLessButton");
          if (showLessButton) {
            showLessButton.addEventListener("click", () => {
              showSongs(songs.slice(0, 5));
            });
          }
        };

        showSongs(songs.slice(0, 5));
      }
    })
    .catch((error) => {
      console.error("Error fetching top songs:", error);
    });
};
// Chiamata alla funzione per ottenere le canzoni popolari dell'artista con ID 412
getTopSongs();


function cambiaColore(elemento) {
  elemento.classList.toggle("cliccato");}




class TopRankedItem {
  constructor(title, type, cover, releaseYear, idAlbum) {
    this.title = title;
    this.type = type === "track" ? "Singolo" : type;
    this.cover = cover;
    this.releaseYear = releaseYear;
    this.idAlbum = idAlbum; // Corretta definizione del campo idAlbum
  }
}

const getTopAlbumsAndTracks = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      eventId +
      "/top?limit=50"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Top items:", data); // Aggiungi questo log per esaminare i dati ricevuti

      // Verifica se i dati ricevuti sono nella struttura attesa
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error("Data structure not as expected");
      }

      const tracks = data.data.filter((item) => item.type === "track");

      // Aggiungiamo l'ID dell'album a ciascuna traccia
      tracks.forEach((track) => {
        track.albumId = track.album.id;
      });

      const albumIds = tracks.map((track) => track.album.id);

      return Promise.all(
        albumIds.map((albumId) =>
          fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            })
            .then((albumData) => albumData)
        )
      ).then((albumsData) => {
        const topRankedAlbums = albumsData.map(
          (albumData) =>
            new TopRankedItem(
              albumData.title,
              "album",
              albumData.cover_medium,
              albumData.release_date,
              albumData.id
            )
        );

        const shuffledAlbums = topRankedAlbums.sort(() => Math.random() - 0.5).slice(0, 4);

        const discographySection =
          document.getElementById("discographySection");
        if (discographySection) {
          shuffledAlbums.forEach((item) => {
            discographySection.innerHTML += `
              <div id="containerCard" class="mt-3 me-4"> <a class="text-white text-decoration-none hoverTransitionWhite" href="./album.html?eventId=${item.idAlbum}">
                  <div class="d-none d-lg-block" id="imageTop">
                      <img src="${item.cover}" class="imageAlbum rounded" alt="Immagine Album">
                  </div>
                  <div class="d-flex" id="imageLeft">
                      <div class="d-flex d-lg-none">
                          <img src="${item.cover}" class="imageAlbum rounded" alt="Immagine Album">
                      </div>
                      <div>
                          <div class="ms-3 mt-3">
                              <p id="titleAlbum">${item.title}</p>
                              <p><span id="tipo">${item.type}</span> <span id="annoDiUscita">${item.releaseYear}</span></p>
                          </div>
                      </div>
                  </div></a>
              </div>
          `;
          });
        }

        const selectedTracks = tracks.slice(0, 2);
        discographySection.innerHTML += selectedTracks
          .map(
            (track) => `
              <div id="containerCard" class="mt-3 me-2" > <a class="text-white text-decoration-none hoverTransitionWhite" href="./album.html?eventId=${track.albumId}">
                  <div class="d-none d-lg-block" id="imageTop">
                      <img src="${track.album.cover_medium}" class="imageAlbum rounded" alt="Immagine Album">
                  </div>
                  <div class="d-flex" id="imageLeft">
                      <div class="d-flex d-lg-none">
                          <img src="${track.album.cover_medium}" class="imageAlbum rounded" alt="Immagine Album">
                      </div>
                      <div>
                          <div class="ms-3 mt-3">
                              <p id="titleAlbum">${track.title}</p>
                              <p><span id="tipo">Singolo</span> </p>
                          </div>
                      </div>
                  </div> </a>
              </div>
          `
          )
          .join("");
      });
    })
    .catch((error) => {
      console.error("Error fetching top items:", error);
    });
};

// Chiamata alla funzione per ottenere i primi 10 album e tracce dell'artista con ID 412
getTopAlbumsAndTracks();




class Album {
  constructor(id, title, cover, releaseDate) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.releaseDate = releaseDate;
  }
}

const getTopAlbums = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      eventId +
      "/top?limit=50"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Top items:", data);

      // Filtra tracce
      const tracks = data.data.filter((item) => item.type === "track");

      // Scegli un numero casuale di tracce (massimo 6)
      const numTracks = Math.min(tracks.length, 6);

      // Ottieni gli ID degli album associati alle tracce selezionate
      const albumIds = tracks
        .slice(0, numTracks)
        .map((track) => track.album.id);

      // Effettua una seconda chiamata API per ottenere informazioni sugli album
      return Promise.all(
        albumIds.map((albumId) =>
          fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            })
            .then(
              (albumData) =>
                new Album(
                  albumData.id,
                  albumData.title,
                  albumData.cover_medium,
                  albumData.release_date
                )
            )
        )
      );
    })
    .then((topAlbums) => {
      // Inserisci i dati degli album nel DOM
      const discographySection = document.getElementById("albumSection");
      if (discographySection) {
        topAlbums.forEach((album) => {
          discographySection.innerHTML += `
                      <div id="" class="pointer">
                          <a href="./album.html?eventId=${album.id}" class=" text-white text-decoration-none">
                              <div class="d-none d-lg-block" id="imageTop">
                                  <img src="${album.cover}" class="imageAlbum rounded" alt="Immagine Album">
                              </div>
                              <div class="d-flex mt-3 me-2"  id="imageLeft">
                                  <div class="d-flex d-lg-none">
                                      <img src="${album.cover}" class="imageAlbum rounded" alt="Immagine Album">
                                  </div>
                                  <div>
                                      <div class="ms-3 mt-3">
                                          <p id="titleAlbum">${album.title}</p>
                                          <p><span id="tipo">Album</span> <span id="annoDiUscita">${album.releaseDate}</span></p>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </div>
                  `;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching top items:", error);
    });
};

// Chiamata alla funzione per ottenere i top 6 album dell'artista
getTopAlbums();
