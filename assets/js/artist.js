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
      playlistPlayer = data.data;
      const artist = data;

      const artistBanner = document.getElementById("artistBanner");
      artistBanner.style.backgroundImage = `url(${artist.data[2].contributors[0].picture_xl})`;
      const artistName = document.getElementById("artistName");
      artistName.innerText = artist.data[1].artist.name;

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
        const preview = artist.data[i].preview;
        const imgCanz = artist.data[i].album.cover_small;
        console.log(imgCanz);
        songTitle.style.cursor = "pointer";

        songTitle.style.cursor = "pointer";

        songsContainer.appendChild(songRow);
        songRow.append(songNumberContainer, albumArtContainer, titleContainer, durationContainer);
        songNumberContainer.appendChild(songNumber);
        titleContainer.appendChild(songTitle);
        durationContainer.append(reproductions, duration);
        albumArtContainer.appendChild(albumArt);

        if (i > 4) {
          songRow.classList.add("hideAndShow", "d-none");
        }

        songTitle.addEventListener("click", () => {
          let songData = {
            preview: artist.data[i].preview,
            title: artist.data[i].title,
            artist: artist.data[i].artist.name,
            cover: imgCanz,
            duration: artist.data[i].duration,
            index: i,
          };
          currentIndex = i;
          playSong(songData);
        });
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
