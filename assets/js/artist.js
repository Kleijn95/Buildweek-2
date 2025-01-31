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
const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

const updateLocalStorage = () => {
  localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
};

// Funzione per popolare la lista
const populateLikedSongs = async () => {
  const likedTracksList = document.querySelector("#likedTracks ul");
  likedTracksList.innerHTML = ""; // Pulisce la lista prima di aggiornarla

  for (const id of likedSongs) {
    try {
      const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });

      const data = await response.json();
      console.log(data);

      // Crea l'elemento <li> con il titolo della canzone
      const listItem = document.createElement("li");
      listItem.textContent = `${data.title} - `;

      const artistLink = document.createElement("a");
      artistLink.textContent = data.artist.name;
      artistLink.href = `artist.html?artistId=${data.artist.id}`;
      artistLink.title = "Vai alla pagina artista"; // Tooltip
      listItem.appendChild(artistLink);
      likedTracksList.appendChild(listItem); // Manca questo passaggio
    } catch (error) {
      console.error(`Errore nel recupero della canzone con ID ${id}:`, error);
    }
  }
};

// Chiamata iniziale per caricare i brani dal localStorage
populateLikedSongs();

function mediaQuery() {
  if (!mediaQueryMd.matches) {
    let likedTraces = document.querySelector("#likedTraces");
    likedTraces.innerText = "";
    let heart = document.createElement("p");
    heart.classList.add("far", "fa-heart", "mb-0", "fs-2");
    likedTraces.appendChild(heart);
  }
}

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
        songTitle.classList.add("text-white", "mb-0", "songTitle");
        songTitle.innerText = artist.data[i].title; //sostituire con titolo canzone
        const durationContainer = document.createElement("div");
        durationContainer.classList.add("col-4", "d-flex", "justify-content-between", "align-items-center");
        const reproductions = document.createElement("span");
        reproductions.classList.add("text-secondary", "d-none", "d-lg-block");
        reproductions.innerText = artist.data[i].rank;
        const duration = document.createElement("h3");
        duration.classList.add("text-secondary", "mb-0");
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
        const cuore = document.createElement("button");
        cuore.classList.add("btn", "text-secondary", "p-0", "ms-5");
        cuore.innerHTML = `<i class="far fa-heart"></i>`;

        songTitle.style.cursor = "pointer";

        songTitle.style.cursor = "pointer";
        if (likedSongs.includes(artist.data[i].id)) {
          cuore.innerHTML = `<i class="fas fa-heart"></i>`; // Cuore pieno se già salvato
        } else {
          cuore.innerHTML = `<i class="far fa-heart"></i>`; // Cuore vuoto se non salvato
        }
        cuore.addEventListener("click", () => {
          const icon = cuore.querySelector("i");
          const id = artist.data[i].id;
          const index = likedSongs.indexOf(id);

          if (index === -1) {
            likedSongs.push(id);
            icon.classList.remove("far");
            icon.classList.add("fas");
          } else {
            likedSongs.splice(index, 1);
            icon.classList.remove("fas");
            icon.classList.add("far");
          }

          updateLocalStorage();
          populateLikedSongs(); // Rende visibile la lista aggiornata
          console.log(likedSongs);
        });

        songsContainer.appendChild(songRow);
        songRow.append(songNumberContainer, albumArtContainer, titleContainer, durationContainer);
        songNumberContainer.appendChild(songNumber);
        titleContainer.appendChild(songTitle);
        durationContainer.append(reproductions, duration);
        albumArtContainer.appendChild(albumArt);

        duration.appendChild(cuore);

        if (i > 4) {
          songRow.classList.add("hideAndShow", "d-none");
        }

        songTitle.addEventListener("click", () => {
          for (element of document.querySelectorAll(".songTitle")) {
            element.classList.remove("text-success");
            element.classList.add("text-white");
          }
          songTitle.classList.remove("text-white");
          songTitle.classList.add("text-success");

          let songData = {
            preview: artist.data[i].preview,
            title: artist.data[i].title,
            artist: artist.data[i].artist.name,
            cover: artist.data[i].album.cover_small,
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
