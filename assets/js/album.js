// imgContainer.addEventListener("click", function () {
//   window.location.assign(`./album.html?albumId=${album.album.id}`);
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // Calcola i minuti interi
  const remainingSeconds = seconds % 60; // Ottieni i secondi rimanenti
  // Formatta i secondi per avere 2 cifre (es. "05" invece di "5")
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
//Variabile per l'audio
let audio = document.createElement("audio");
//Variabile che si aggiorna se un audio è in riproduzione
let currentAudio = null;

//Variabile per imgPlayer
let imgPlayer = document.createElement("img");
//Variabile che tine conto dell'immagine nel player
let currentImg = null;

let titlePlayer = document.querySelector(".titolo");
let artistPlayer = document.querySelector(".artista");

currentTitlePlayer = null;
currentArtistPlayer = null;

let player = document.querySelector(".playerSong");

let logo = document.querySelector(".spotify");

let like = document.querySelector(".like");
let dislike = document.querySelector(".dislike");
let volume = document.querySelector(".volume");
let noVolume = document.querySelector(".noVolume");

like.addEventListener("click", () => {
  like.classList.add("d-none");
  dislike.classList.remove("d-none");
});
dislike.addEventListener("click", () => {
  like.classList.remove("d-none");
  dislike.classList.add("d-none");
});

volume.addEventListener("click", () => {
  volume.classList.add("d-none");
  noVolume.classList.remove("d-none");
});
noVolume.addEventListener("click", () => {
  volume.classList.remove("d-none");
  noVolume.classList.add("d-none");
});

const arrayPlaylist = [
  8454338222, 13015611143, 248297032, 1976454162, 2298075882, 8606835902, 2153050122, 1282495565, 6682665064,
  1313621735, 1116187241, 733113466,
];
const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");
const playlistId = params.get("playlistId");

let URL;
let headers = {
  "Content-Type": "application/json",
};

if (playlistId) {
  URL = "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + playlistId;
  headers["x-rapidapi-key"] = "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db";
  headers["x-rapidapi-host"] = "deezerdevs-deezer.p.rapidapi.com";
} else if (albumId) {
  URL = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;
  headers["Authorization"] = "Bearer cdd499bc73msh8003c69cf9aa9dcp12c566jsnf97718531566";
} else {
  console.error("Nessun parametro valido trovato nell'URL.");
}

if (URL) {
  fetch(URL, {
    method: "GET",
    headers: headers,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Impossibile recuperare i dati. Riprova più tardi.");
      }
    })
    .then((data) => {
      if (albumId) {
        const album = data.tracks.data || [];
        console.log(album);

        for (i = 0; i < album.length; i++) {
          /* console.log(album[i].album.title); */
          // iterare la playlist o l'album
          const songsContainer = document.getElementById("songsContainer");
          const songRow = document.createElement("div");
          songRow.classList.add("row", "align-items-center");
          const songNumberContainer = document.createElement("div");
          songNumberContainer.classList.add("col-1");
          const songNumber = document.createElement("p");
          songNumber.classList.add("text-secondary", "text-end", "songNumber", "fw-bold", "mb-2");
          songNumber.innerText = i + 1;
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("col-7", "mb-3");
          const songTitle = document.createElement("h3");
          songTitle.classList.add("text-white", "mb-0");
          songTitle.innerText = album[i].title;
          const artist = document.createElement("a");

          console.log(album[i].album.cover_small);
          const imgCanz = album[i].album.cover_small;
          songTitle.style.cursor = "pointer";
          const preview = album[i].preview;
          const titolo = album[i].title;
          const nomeArtista = album[i].artist.name;

          songTitle.style.cursor = "pointer";
          //Funzione per far partire le canzoni
          function playSong(previewUrl) {
            if (currentAudio === previewUrl) {
              if (!audio.paused) {
                audio.pause();
              } else {
                audio.play();
              }
            } else {
              audio.src = previewUrl;
              audio.play();
              currentAudio = previewUrl;
            }
          }
          function imgSong(imgSong) {
            if (currentImg === imgSong) {
              imgPlayer.src.remove();
              logo.classList.add("d-none");
            } else {
              imgPlayer.src = imgSong;
              player.appendChild(imgPlayer);
              logo.classList.add("d-none");
            }
          }
          function titleSong(titleSong) {
            if (currentTitlePlayer === titleSong) {
              titlePlayer.innerHTML = "";
            } else {
              titlePlayer.innerHTML = titleSong;
            }
          }
          function artista(artista) {
            if (currentArtistPlayer === artista) {
              artistPlayer.innerHTML = "";
            } else {
              artistPlayer.innerHTML = artista;
            }
          }

          //Evento che chiama la funzione per far partire le canzoni
          songTitle.addEventListener("click", () => {
            playSong(preview);
            imgSong(imgCanz);
            like.classList.remove("d-none");
            titleSong(titolo);
            artista(nomeArtista);
          });

          artist.classList.add("text-secondary", "text-decoration-none", "artist");
          artist.href = "./artist.html?artistId=" + album[i].artist.id;
          artist.innerText = album[i].artist.name;
          const durationContainer = document.createElement("div");
          durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
          const reproductions = document.createElement("span");
          reproductions.classList.add("text-secondary");
          reproductions.innerText = album[i].rank;
          const duration = document.createElement("h3");
          duration.classList.add("text-secondary");
          duration.innerText = formatDuration(album[i].duration);

          const albumImg = document.getElementById("albumImg");
          const artistName = document.getElementById("artist");
          const songName = document.getElementById("songName");
          albumImg.src = album[0].album.cover_big;
          artistName.innerText = album[0].artist.name;
          songName.innerText = album[0].album.title;

          document.querySelector(".artistPic").src = data.artist.picture;
          document.querySelector(".artistPic").alt = data.artist.name;
          document.querySelector(".tracks").innerText = i + 1 + " brani";
          document.querySelector(".year").innerText = data.release_date.slice(0, 4);
          document.querySelector(".duration").innerText = formatDuration(data.duration);

          songsContainer.appendChild(songRow);
          songRow.append(songNumberContainer, titleContainer, durationContainer);
          songNumberContainer.appendChild(songNumber);
          titleContainer.append(songTitle, artist);
          durationContainer.append(reproductions, duration);
        }
      } else if (playlistId) {
        const playlist = data.tracks.data;
        console.log(data);
        for (i = 0; i < playlist.length; i++) {
          /* console.log(playlist[i].album.title); */
          // iterare la playlist o l'album
          const songsContainer = document.getElementById("songsContainer");
          const songRow = document.createElement("div");
          songRow.classList.add("row", "align-items-center");
          const songNumberContainer = document.createElement("div");
          songNumberContainer.classList.add("col-1");
          const songNumber = document.createElement("p");
          songNumber.classList.add("text-secondary", "text-end", "songNumber", "fw-bold", "mb-2");
          songNumber.innerText = i + 1;
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("col-7", "mb-3");
          const songTitle = document.createElement("h3");
          songTitle.classList.add("text-white", "mb-0");
          songTitle.innerText = playlist[i].title;
          const artist = document.createElement("a");
          console.log(playlist[i].preview);

          artist.classList.add("text-secondary", "text-decoration-none", "artist");
          artist.href = "./artist.html?artistId=" + playlist[i].artist.id;
          artist.innerText = playlist[i].artist.name;
          const durationContainer = document.createElement("div");
          durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
          const reproductions = document.createElement("span");
          reproductions.classList.add("text-secondary");
          reproductions.innerText = playlist[i].rank;
          const duration = document.createElement("h3");
          duration.classList.add("text-secondary");
          duration.innerText = formatDuration(playlist[i].duration);

          const albumImg = document.getElementById("albumImg");
          const artistName = document.getElementById("artist");
          const songName = document.getElementById("songName");
          albumImg.src = data.picture_xl;
          artistName.innerText = data.creator.name;
          songName.innerText = data.title;

          document.querySelector(".artistPic").src = data.picture_xl;
          document.querySelector(".artistPic").alt = data.creator.name;
          document.querySelector(".tracks").innerText = i + 1 + " brani";
          document.querySelector(".year").innerText = data.creation_date.slice(0, 4);
          document.querySelector(".duration").innerText = formatDuration(data.duration);

          songsContainer.appendChild(songRow);
          songRow.append(songNumberContainer, titleContainer, durationContainer);
          songNumberContainer.appendChild(songNumber);
          titleContainer.append(songTitle, artist);
          durationContainer.append(reproductions, duration);
        }
      }
    })
    .catch((error) => console.error(error));
}

let aside = document.querySelector("aside");
let closeAside = document.querySelector(".closeAside");
let showAside = document.querySelector(".showAside");

closeAside.addEventListener("click", () => {
  aside.classList.add("d-none");
});

showAside.addEventListener("click", () => {
  if (aside.classList.contains("d-none")) {
    aside.classList.remove("d-none");
  } else {
    aside.classList.add("d-none");
  }
});

let playlists = JSON.parse(sessionStorage.getItem("playlists"));

console.log(playlists);

playlists.forEach((playlistId) => {
  let placeholderPlaylist = document.querySelector(".playlists");

  let pPlaylist = document.createElement("p");
  pPlaylist.style.cursor = "pointer";
  pPlaylist.innerText = playlistId.title;

  // Aggiunge l'evento click solo a questo <p>
  pPlaylist.addEventListener("click", function () {
    window.location.assign(`./album.html?playlistId=${playlistId.id}`);
  });

  placeholderPlaylist.appendChild(pPlaylist);
});
