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
        playlistPlayer = data.tracks.data;
        console.log(playlistPlayer);
        const album = data.tracks.data || [];

        for (let i = 0; i < album.length; i++) {
          console.log(album);
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
          const imgCanz = album[i].album.cover_small;
          songTitle.style.cursor = "pointer";
          const preview = album[i].preview;
          const titolo = album[i].title;
          const nomeArtista = album[i].artist.name;

          songTitle.style.cursor = "pointer";

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

          songTitle.addEventListener("click", () => {
            if (!audio.paused) {
              songTitle.classList.remove("text-success");
              songTitle.classList.add("text-white");
            } else {
              songTitle.classList.remove("text-white");
              songTitle.classList.add("text-success");
            }

            let songData = {
              preview: album[i].preview,
              title: album[i].title,
              artist: album[i].artist.name,
              cover: album[i].album.cover_small,
              duration: album[i].duration,
              index: i,
            };
            currentIndex = i; // Imposta l'indice attuale
            playSong(songData);
          });
        }
      } else if (playlistId) {
        playlistPlayer = data.tracks.data;
        let playlist = data.tracks.data;
        let album = data.tracks.data || [];
        for (let j = 0; j < playlist.length; j++) {
          /* console.log(playlist[i].album.title); */
          // iterare la playlist o l'album
          const songsContainer = document.getElementById("songsContainer");
          const songRow = document.createElement("div");
          songRow.classList.add("row", "align-items-center");
          const songNumberContainer = document.createElement("div");
          songNumberContainer.classList.add("col-1");
          const songNumber = document.createElement("p");
          songNumber.classList.add("text-secondary", "text-end", "songNumber", "fw-bold", "mb-2");
          songNumber.innerText = j + 1;
          const titleContainer = document.createElement("div");
          titleContainer.classList.add("col-7", "mb-3");
          const songTitle = document.createElement("h3");
          console.log(playlist[j].artist.id);
          songTitle.classList.add("text-white", "mb-0");
          songTitle.innerText = playlist[j].title;
          songTitle.style.cursor = "pointer";
          const artist = document.createElement("a");
          console.log(playlist[j].preview);

          artist.classList.add("text-secondary", "text-decoration-none", "artist");
          artist.href = "./artist.html?artistId=" + playlist[j].artist.id;
          artist.innerText = playlist[j].artist.name;
          const durationContainer = document.createElement("div");
          durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
          const reproductions = document.createElement("span");
          reproductions.classList.add("text-secondary");
          reproductions.innerText = playlist[j].rank;
          const duration = document.createElement("h3");
          duration.classList.add("text-secondary");
          duration.innerText = formatDuration(playlist[j].duration);

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
          document.querySelector(".tracks").innerText = j + 1 + " brani";
          document.querySelector(".year").innerText = data.creation_date.slice(0, 4);
          document.querySelector(".duration").innerText = formatDuration(data.duration);

          songsContainer.appendChild(songRow);
          songRow.append(songNumberContainer, titleContainer, durationContainer);
          songNumberContainer.appendChild(songNumber);
          titleContainer.append(songTitle, artist);
          durationContainer.append(reproductions, duration);

          songTitle.addEventListener("click", () => {
            let songData = {
              preview: playlist[j].preview,
              title: playlist[j].title,
              artist: playlist[j].artist.name,
              cover: playlist[j].album.cover_small,
              duration: playlist[j].duration,
              index: j,
            };
            currentIndex = j; // Imposta l'indice attuale
            playSong(songData);
          });
        }
      }
    })
    .catch((error) => console.error(error));
}
