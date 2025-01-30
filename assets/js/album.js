// imgContainer.addEventListener("click", function () {
//   window.location.assign(`./album.html?albumId=${album.album.id}`);
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // Calcola i minuti interi
  const remainingSeconds = seconds % 60; // Ottieni i secondi rimanenti
  // Formatta i secondi per avere 2 cifre (es. "05" invece di "5")
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

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

let currentTitlePlayer = null;
let currentArtistPlayer = null;

let player = document.querySelector(".playerSong");

let logo = document.querySelector(".spotify");

let like = document.querySelector(".like");
let dislike = document.querySelector(".dislike");
let volume = document.querySelector(".volume");
let noVolume = document.querySelector(".noVolume");

let barraVolume = document.querySelector(".barraVolume");
let timeSong = document.querySelector(".timeSong");

let start = document.querySelector(".start");
let pause = document.querySelector(".pausa");

let back = document.querySelector(".back");
let next = document.querySelector(".next");

like.addEventListener("click", () => {
  like.classList.add("d-none");
  dislike.classList.remove("d-none");
});
dislike.addEventListener("click", () => {
  like.classList.remove("d-none");
  dislike.classList.add("d-none");
});

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

        for (let i = 0; i < album.length; i++) {
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
          songTitle.style.cursor = "pointer";
          songTitle.setAttribute("data-bs-toggle", "tooltip");
          songTitle.setAttribute("data-bs-placement", "left");
          songTitle.setAttribute("title", "Play song");
          var tooltip = new bootstrap.Tooltip(songTitle);
          const artist = document.createElement("a");
          artist.setAttribute("data-bs-toggle", "tooltip");
          artist.setAttribute("data-bs-placement", "right");
          artist.setAttribute("title", "Vai alla pagina artista");
          var tooltip = new bootstrap.Tooltip(artist);
          console.log(album[i].preview);
          const imgCanz = album[i].album.cover_small;
          songTitle.style.cursor = "pointer";
          const preview = album[i].preview;
          const titolo = album[i].title;
          const nomeArtista = album[i].artist.name;
          let timePlay = formatDuration(album[i].duration);

          songTitle.style.cursor = "pointer";
          //Funzione per far partire le canzoni
          function playSong(previewUrl) {
            if (currentAudio === previewUrl) {
              if (!audio.paused) {
                audio.pause();
              } else {
                audio.play();
                barraVolume.disabled = false;
                timeSong.innerHTML = formatDuration(album[i].duration);
                pause.classList.add("d-none");
              }
            } else {
              audio.src = previewUrl;
              audio.play();
              currentAudio = previewUrl;
              barraVolume.disabled = false;
              timeSong.innerHTML = formatDuration(album[i].duration);
              start.classList.add("d-none");
            }
          }
          //Funzione per il tasto play
          function playSong2(previewUrl) {
            if (!audio.paused) {
              audio.pause();
              barraVolume.disabled = false;
            }
          }
          //Funzione per l'immagine nella playbar
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
          //Funzione per il titolo della canzone nella play
          function titleSong(titleSong) {
            if (currentTitlePlayer === titleSong) {
              titlePlayer.innerHTML = "";
            } else {
              titlePlayer.innerHTML = titleSong;
            }
          }
          //Funzione per il nome dell'artista nella play
          function artista(artista) {
            if (currentArtistPlayer === artista) {
              artistPlayer.innerHTML = "";
            } else {
              artistPlayer.innerHTML = artista;
            }
          }

          function noVol() {
            if (!audio.paused) {
              volume.classList.add("d-none");
              noVolume.classList.remove("d-none");
              audio.muted = true;
              barraVolume.max = "";
              barraVolume.disabled = true;
            }
          }
          function vol() {
            if (!audio.paused) {
              volume.classList.remove("d-none");
              noVolume.classList.add("d-none");
              audio.muted = false;
              barraVolume.disabled = false;
              barraVolume.max = "10";
            }
          }
          let currentIndex = 0;

          function nextSong() {
            if (currentIndex < album.length - 1) {
              currentIndex++; // Va alla traccia successiva
            } else {
              currentIndex = 0;
            }

            currentAudio = album[currentIndex].preview;
            playSong(currentAudio);
            imgSong(album[currentIndex].album.cover_small);
            titleSong(album[currentIndex].title);
            artista(album[currentIndex].artist.name);

            let newAudio = album[currentIndex].preview;
            audio.src = newAudio;
            audio.play();

            start.classList.add("d-none");
            pause.classList.remove("d-none");
          }

          console.log(currentAudio);
          let backCurrentIndex = currentAudio;

          function backSong() {
            if (backCurrentIndex < album.length - 1) {
              backCurrentIndex--; // Va alla traccia precedente
            } else {
              backCurrentIndex = 0;
            }

            currentAudio = album[backCurrentIndex].preview;
            playSong(currentAudio);
            imgSong(album[backCurrentIndex].album.cover_small);
            titleSong(album[backCurrentIndex].title);
            artista(album[backCurrentIndex].artist.name);

            let newAudio = album[backCurrentIndex].preview;
            audio.src = newAudio;
            audio.play();

            start.classList.add("d-none");
            pause.classList.remove("d-none");
          }

          //Evento che chiama la funzione per far partire le canzoni
          songTitle.addEventListener("click", () => {
            playSong(preview);
            imgSong(imgCanz);
            like.classList.remove("d-none");
            titleSong(titolo);
            artista(nomeArtista);
            pause.classList.remove("d-none");
          });

          //Eventi della playbar

          start.addEventListener("click", () => {
            if (album.length > 0) {
              //parte dalla prima
              playSong(album[0].preview);
              imgSong(album[0].album.cover_small);
              like.classList.remove("d-none");
              titleSong(album[0].title);
              artista(album[0].artist.name);
              pause.classList.remove("d-none");
              start.classList.add("d-none");
            }
          });
          pause.addEventListener("click", () => {
            playSong2(preview);
            start.classList.remove("d-none");
            pause.classList.add("d-none");
          });
          volume.addEventListener("click", () => {
            noVol();
          });
          noVolume.addEventListener("click", () => {
            vol();
          });
          next.addEventListener("click", () => {
            nextSong();

            //console.log(currentAudio);
          });

          back.addEventListener("click", () => {
            backSong();
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
          albumImg.crossOrigin = "Anonymous";

          const colorThief = new ColorThief();

          // Quando l'immagine è caricata, estrai il colore dominante
          albumImg.onload = () => {
            // Estrai il colore dominante
            const dominantColor = colorThief.getColor(albumImg); // Passa l'elemento immagine, non l'URL
            console.log(dominantColor);
            const darkColor = dominantColor.map((c) => Math.max(c - 50, 0)); // Riduce la luminosità di 50

            // Crea un gradiente che va dal colore dominante al colore più scuro
            const gradient = `linear-gradient(to bottom, rgb(${dominantColor.join(",")}), rgb(${darkColor.join(",")}))`;

            // Imposta il gradiente come sfondo
            document.querySelector("main").style.background = gradient;
          };

          // Gestisci l'errore nel caso l'immagine non si carichi
          albumImg.onerror = () => {
            console.error("Immagine non caricata correttamente.");
          };

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
        console.log(playlist);
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
          console.log(playlist[i].artist.id);
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

          albumImg.crossOrigin = "Anonymous";

          const colorThief = new ColorThief();

          // Quando l'immagine è caricata, estrai il colore dominante
          albumImg.onload = () => {
            // Estrai il colore dominante
            const dominantColor = colorThief.getColor(albumImg); // Passa l'elemento immagine, non l'URL
            console.log(dominantColor);
            const darkColor = dominantColor.map((c) => Math.max(c - 50, 0)); // Riduce la luminosità di 50

            // Crea un gradiente che va dal colore dominante al colore più scuro
            const gradient = `linear-gradient(to bottom, rgb(${dominantColor.join(",")}), rgb(${darkColor.join(",")}))`;

            // Imposta il gradiente come sfondo
            document.querySelector("main").style.background = gradient;
          };

          // Gestisci l'errore nel caso l'immagine non si carichi
          albumImg.onerror = () => {
            console.error("Immagine non caricata correttamente.");
          };

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
