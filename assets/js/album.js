//mettere dentro alla fetch con l'id della playlist o dell'album
for (i = 0; i < 15; i++) {
  //iterare la playlist o l'album
  const songsContainer = document.getElementById("songsContainer");
  const songRow = document.createElement("div");
  songRow.classList.add("row", "align-items-center");
  const songNumberContainer = document.createElement("div");
  songNumberContainer.classList.add("col-1");
  const songNumber = document.createElement("p");
  songNumber.classList.add("text-secondary");
  songNumber.innerText = i + 1; // iterare l'array delle canzoni contenute nella playlist o nell'album
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("col-7");
  const songTitle = document.createElement("h3");
  songTitle.classList.add("text-white");
  songTitle.innerText = "Titolo canzone"; //sostituire con titolo canzone
  const artist = document.createElement("h5");
  artist.classList.add("text-secondary");
  artist.innerText = "Artista sconosciuto"; // sostituire con artista
  const durationContainer = document.createElement("div");
  durationContainer.classList.add("col-4", "d-flex", "justify-content-between");
  const reproductions = document.createElement("span");
  reproductions.classList.add("text-secondary");
  reproductions.innerText = "897.998"; // sostituire con dato vero
  const duration = document.createElement("h3");
  duration.classList.add("text-secondary");
  duration.innerText = "0:00"; //sostituire con durata
  const hr = document.createElement("hr");
  hr.classList.add("text-secondary");

  songsContainer.appendChild(songRow);
  songRow.append(songNumberContainer, titleContainer, durationContainer, hr);
  songNumberContainer.appendChild(songNumber);
  titleContainer.append(songTitle, artist);
  durationContainer.append(reproductions, duration);
}
