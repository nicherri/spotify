//Funzione SALUTO (Vedi header)
function saluto() {
  var oraAttuale = new Date().getHours();
  var salutoElement = document.getElementById("salutoPlaceholder");
  if (oraAttuale >= 4 && oraAttuale < 17) {
    salutoElement.textContent = "Buongiorno";
  } else {
    salutoElement.textContent = "Buonasera";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  saluto();
});

//Fetch 1
const getYourFavsUno = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/7927764`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    //Estraggo
    .then((albums) => {
      const yourFavsList = document.getElementById("yourFavs");
      //DOM Manipulation
      const newAlbum = document.createElement("div");
      newAlbum.classList.add("col");
      newAlbum.innerHTML = `
            <div class="card hoverTransitionWhite bg-spotifyPrimary h-100 text-light" id="cardDiv">
                <img src="${albums.cover_medium}" class="card-img-top p-2 rounded-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${albums.title}</h5>
                    <p class="card-artist text-spotifyQuartary">${albums.artist.name}</p>
            `;
      yourFavsList.appendChild(newAlbum);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    //Estraggo
    .then((albums) => {
      const yourFavsList = document.getElementById("yourFavs");
      //DOM Manipulation
      const newAlbum = document.createElement("div");
      newAlbum.classList.add("col");
      newAlbum.innerHTML = `
            <div class="card hoverTransitionWhite hoverTransitionWhite bg-spotifyPrimary h-100 text-light  id="cardDiv"">
                <img src="${albums.cover_medium}" class="card-img-top p-2 rounded-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${albums.title}</h5>
                    <p class="card-artist text-spotifyQuartary">${albums.artist.name}</p>
            `;
      yourFavsList.appendChild(newAlbum);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/304178047")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    //Estraggo
    .then((albums) => {
      const yourFavsList = document.getElementById("yourFavs");
      //DOM Manipulation
      const newAlbum = document.createElement("div");
      newAlbum.classList.add("col");
      newAlbum.innerHTML = `
            <div class="card hoverTransitionWhite bg-spotifyPrimary h-100 text-light" id="cardDiv">
                <img src="${albums.cover_medium}" class="card-img-top p-2 rounded-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${albums.title}</h5>
                    <p class="card-artist text-spotifyQuartary">${albums.artist.name}</p>
            `;
      yourFavsList.appendChild(newAlbum);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/560451292")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    //Estraggo
    .then((albums) => {
      const yourFavsList = document.getElementById("yourFavs");
      //DOM Manipulation
      const newAlbum = document.createElement("div");
      newAlbum.classList.add("col");
      newAlbum.innerHTML = `
            <div class="card hoverTransitionWhite bg-spotifyPrimary h-100 text-light" id="cardDiv">
                <img src="${albums.cover_medium}" class="card-img-top p-2 rounded-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${albums.title}</h5>
                    <p class="card-artist text-spotifyQuartary">${albums.artist.name}</p>
            `;
      yourFavsList.appendChild(newAlbum);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/108706862")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    //Estraggo
    .then((albums) => {
      const yourFavsList = document.getElementById("yourFavs");
      //DOM Manipulation
      const newAlbum = document.createElement("div");
      newAlbum.classList.add("col");
      newAlbum.innerHTML = `
            <div class="card hoverTransitionWhite bg-spotifyPrimary h-100 text-light" id="cardDiv">
                <img src="${albums.cover_medium}" class="card-img-top p-2 rounded-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${albums.title}</h5>
                    <p class="card-artist text-spotifyQuartary">${albums.artist.name}</p>
            `;
      yourFavsList.appendChild(newAlbum);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
};
getYourFavsUno();

// FETCH MUSIC PLAYER
const getOneMusicToPlay = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/262561252")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Brava, hai sbagliato");
      }
    })
    .then((song) => {
      const musicPlayer = document.getElementById("musicPlayer");
      const newSong = document.createElement("div");
      newSong.classList.add("d-flex");
      newSong.classList.add("w-100");
      newSong.innerHTML = `
        <div>
        <img src="${song.cover_medium}" class="me-3 mt-4" alt="Estate 2022" style="width: 200px; height: 200px;"> 
    </div>
    <div class="d-flex flex-column justify-content-between">
        <div class="d-flex flex-column">
            <h1 class="mt-3">${song.title}</h1>
            <p>${song.artist.name}</p>
            <p>Ascolta ora il nuovo album di ${song.artist.name}!</p>
            <div class="mt-2 mb-3">
                <button type="button" class="btn px-4 btn-spotifySecondary rounded-5 fw-bold" id="button">Play</button>
                <button type="button" class="btn px-4 btn-spotifyPrimary border-light text-spotifyQuartary rounded-5 fw-bold" id="button">Salva</button>
                <button type="button" class="btn px-4 btn-spotifyPrimary text-spotifyQuartary rounded-5 fw-bold" id="button"><i class="bi bi-three-dots"></i></button>
            </div>
        </div>
    </div>
</div>
<div class="ms-auto mt-2 "> 
    <button type="button" class="btn btn-spotifyTertiary text-spotifyQuartary rounded-5 btn-sm" id="button">NASCONDI ANNUNCI</button>
</div>
        `;
      musicPlayer.appendChild(newSong);
    })

    .catch((err) => {
      console.log("Fai schifo", err);
    });
};
getOneMusicToPlay();
