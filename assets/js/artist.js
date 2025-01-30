let hidden = true;
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // Calcola i minuti interi
  const remainingSeconds = seconds % 60; // Ottieni i secondi rimanenti
  // Formatta i secondi per avere 2 cifre (es. "05" invece di "5")
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=15";
const songsContainer = document.getElementById("artistTracks");

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
//Fine elementi player
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

/*let like = document.querySelector(".like");
let dislike = document.querySelector(".dislike");
let volume = document.querySelector(".volume");
let noVolume = document.querySelector(".noVolume");

let start = document.querySelector(".start");
let pause = document.querySelector(".pausa");*/

// ciclo per popolare asidebar sinistra delle playlist. L'array playlist è chiamato in cima (reminder!! ho dato display none ai placeholder)

function fetchArtist() {
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization: "Bearer cdd499bc73msh8003c69cf9aa9dcp12c566jsnf97718531566", // Verifica se è necessario
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Impossibile recuperare l'artista. Riprova più tardi.");
      }
    })
    .then((data) => {
      const artist = data;
      console.log(artist);
      console.log(artist.data[0].contributors[0].picture_xl);
      const artistBanner = document.getElementById("artistBanner");
      artistBanner.style.backgroundImage = `url(${artist.data[0].contributors[0].picture_xl})`;
      const artistName = document.getElementById("artistName");
      artistName.innerText = artist.data[0].artist.name;

      for (let i = 0; i < 15; i++) {
        const songRow = document.createElement("div");
        songRow.classList.add("row", "align-items-center", "d-flex", "pb-3");
        const songNumberContainer = document.createElement("div");
        songNumberContainer.classList.add("col-1");
        const songNumber = document.createElement("p");
        songNumber.classList.add("text-secondary", "text-end", "songNumber", "fw-bold", "mb-2");
        songNumber.innerText = i + 1; // iterare l'array delle canzoni contenute nella playlist o nell'album
        const albumArtContainer = document.createElement("div");
        albumArtContainer.classList.add("col-2");
        const albumArt = document.createElement("img");
        albumArt.src = artist.data[i].album.cover;
        albumArt.classList.add("img-fluid");
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("col", "mb-3");
        const songTitle = document.createElement("h3");
        songTitle.classList.add("text-white", "mb-0");
        songTitle.innerText = artist.data[i].title; //sostituire con titolo canzone
        const durationContainer = document.createElement("div");
        durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
        const reproductions = document.createElement("span");
        reproductions.classList.add("text-secondary");
        reproductions.innerText = artist.data[i].rank;
        const duration = document.createElement("h3");
        duration.classList.add("text-secondary");
        duration.innerText = formatDuration(artist.data[i].duration); //sostituire con durata
        const showOthers = document.createElement("p");
        showOthers.setAttribute("id", "showOthers");
        showOthers.classList.add("text-secondary");
        songTitle.style.cursor = "pointer";
        songTitle.setAttribute("data-bs-toggle", "tooltip");
        songTitle.setAttribute("data-bs-placement", "left");
        songTitle.setAttribute("title", "Play song");
        var tooltip = new bootstrap.Tooltip(songTitle);
        const preview = artist.data[i].preview;
        console.log(preview);
        const imgCanz = artist.data[i].album.cover_small;
        console.log(imgCanz);
        songTitle.style.cursor = "pointer";
        const titolo = artist.data[i].title;
        const nomeArtista = artist.data[i].artist.name;

        songTitle.style.cursor = "pointer";
        //Funzione per far partire le canzoni
        function playSong(previewUrl) {
          if (currentAudio === previewUrl) {
            if (!audio.paused) {
              audio.pause();
            } else {
              audio.play();
              barraVolume.disabled = false;
              timeSong.innerHTML = formatDuration(artist.data[i].duration);
              pause.classList.add("d-none");
            }
          } else {
            audio.src = previewUrl;
            audio.play();
            currentAudio = previewUrl;
            barraVolume.disabled = false;
            timeSong.innerHTML = formatDuration(artist.data[i].duration);
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
          playSong(album[i].preview);
          imgSong(imgCanz);
          like.classList.remove("d-none");
          titleSong(titolo);
          artista(nomeArtista);
          pause.classList.remove("d-none");
          start.classList.add("d-none");
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

        songsContainer.appendChild(songRow);
        songRow.append(songNumberContainer, albumArtContainer, titleContainer, durationContainer);
        songNumberContainer.appendChild(songNumber);
        titleContainer.appendChild(songTitle);
        durationContainer.append(reproductions, duration);
        albumArtContainer.appendChild(albumArt);

        if (i > 4) {
          songRow.classList.add("hideAndShow", "d-none");
        }
      }
    })
    .finally(() => {
      const showOthers = document.createElement("p");
      showOthers.setAttribute("id", "showOthers");
      showOthers.classList.add("text-secondary");
      songsContainer.appendChild(showOthers);

      showOthers.innerText = "Visualizza Altro";

      document.getElementById("showOthers").onclick = () => {
        if (hidden === true) {
          hidden = false;
          showOthers.innerText = "Nascondi";
          for (element of document.querySelectorAll(".hideAndShow")) {
            element.classList.remove("d-none");
          }
        } else {
          hidden = true;
          showOthers.innerText = "Visualizza Altro";
          for (element of document.querySelectorAll(".hideAndShow")) {
            element.classList.add("d-none");
          }
        }
      };
    });
}
fetchArtist();
