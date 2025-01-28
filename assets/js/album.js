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

const URL = "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId;

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
      throw new Error("Impossibile recuperare gli album. Riprova più tardi.");
    }
  })
  .then((data) => {
    const albums = data.tracks.data; // Assumi che la risposta sia un array di album in "data"
    console.log(data);
    for (i = 0; i < albums.length; i++) {
      console.log(albums[i].album.title);
      //iterare la playlist o l'album
      const songsContainer = document.getElementById("songsContainer");
      const songRow = document.createElement("div");
      songRow.classList.add("row", "align-items-center");
      const songNumberContainer = document.createElement("div");
      songNumberContainer.classList.add("col-1");
      const songNumber = document.createElement("p");
      songNumber.classList.add("text-secondary", "text-end", "songNumber", "fw-bold", "mb-2");
      songNumber.innerText = i + 1; // iterare l'array delle canzoni contenute nella playlist o nell'album
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("col-7", "mb-3");
      const songTitle = document.createElement("h3");
      songTitle.classList.add("text-white", "mb-0");
      songTitle.innerText = albums[i].title; //sostituire con titolo canzone
      const artist = document.createElement("a");
      artist.classList.add("text-secondary", "text-decoration-none", "artist");
      artist.href = "./artist.html?artistId=" + albums[i].artist.id;
      artist.innerText = albums[i].artist.name; // sostituire con artista
      const durationContainer = document.createElement("div");
      durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
      const reproductions = document.createElement("span");
      reproductions.classList.add("text-secondary");
      reproductions.innerText = albums[i].rank;
      const duration = document.createElement("h3");
      duration.classList.add("text-secondary");
      duration.innerText = formatDuration(albums[i].duration); //sostituire con durata

      const albumImg = document.getElementById("albumImg");
      const artistName = document.getElementById("artist");
      const songName = document.getElementById("songName");
      albumImg.src = albums[0].album.cover_big;
      artistName.innerText = albums[0].artist.name;
      songName.innerText = albums[0].album.title;

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
  });

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
