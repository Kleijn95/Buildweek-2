const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");
const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10";

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

    /*  for (i = 0; i < albums.length; i++) {
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
      } */
  });
