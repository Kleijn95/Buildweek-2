let top5 = 5;
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
      artistBanner.style.backgroundImage = `url(${artist.data[0].contributors[0].picture_xl}`;
      const artistName = document.getElementById("artistName");
      artistName.innerText = artist.data[0].artist.name;

      for (i = 0; i < top5; i++) {
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
        const preview = artist.data[i].preview;
        songTitle.addEventListener("click", () => {
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.innerHTML = `
                  <source src="${preview}" type="audio/mpeg">
                  Il tuo browser non supporta l'elemento audio.`;
          document.body.appendChild(audio);
          audio.play().catch((error) => {
            console.error("Errore durante la riproduzione:", error);
          });
        });

        songsContainer.appendChild(songRow);
        songRow.append(songNumberContainer, albumArtContainer, titleContainer, durationContainer);
        songNumberContainer.appendChild(songNumber);
        titleContainer.appendChild(songTitle);
        durationContainer.append(reproductions, duration);
        albumArtContainer.appendChild(albumArt);
      }
    })
    .finally(() => {
      const showOthers = document.createElement("p");
      showOthers.setAttribute("id", "showOthers");
      showOthers.classList.add("text-secondary");
      songsContainer.appendChild(showOthers);
      if (top5 === 5) {
        showOthers.innerText = "Visualizza Altro";
      } else {
        showOthers.innerText = "Nascondi";
      }
      document.getElementById("showOthers").onclick = () => {
        if (top5 === 5) {
          top5 = 15;
        } else {
          top5 = 5;
        }
        songsContainer.innerHTML = "";
        fetchArtist();
      };
    });
}
fetchArtist();
