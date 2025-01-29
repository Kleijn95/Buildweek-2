// imgContainer.addEventListener("click", function () {
//   window.location.assign(`./album.html?albumId=${album.album.id}`);
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // Calcola i minuti interi
  const remainingSeconds = seconds % 60; // Ottieni i secondi rimanenti
  // Formatta i secondi per avere 2 cifre (es. "05" invece di "5")
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

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
          console.log(album[i].preview);
          songTitle.style.cursor = "pointer";
          const preview = album[i].preview;
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
          songTitle.style.cursor = "pointer";
          const preview = playlist[i].preview;
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
