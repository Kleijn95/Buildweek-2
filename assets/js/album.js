for (i = 0; i < 10; i++) {
  //iterare la playlist o l'album
  const songsContainer = document.getElementById("songsContainer");
  const songRow = document.createElement("div");
  songRow.classList.add("row", "align-items-center");
  const songNumberContainer = document.createElement("div");
  songNumberContainer.classList.add("col-1");
  const songNumber = document.createElement("p");
  songNumber.classList.add("text-white");
  songNumber.innerText = i + 1; // iterare l'array delle canzoni contenute nella playlist o nell'album
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("col-7");
  const songTitle = document.createElement("h3");
  songTitle.classList.add("text-white");
  songTitle.innerText = "Titolo canzone"; //sostituire con titolo canzone
  const durationContainer = document.createElement("div");
  durationContainer.classList.add("col-4");
  const duration = document.createElement("h3");
  duration.classList.add("d-flex", "justify-content-end", "text-white");
  duration.innerText = "0:00"; //sostituire con durata
  const hr = document.createElement("hr");
  hr.classList.add("text-secondary");

  songsContainer.appendChild(songRow);
  songRow.append(songNumberContainer, titleContainer, durationContainer, hr);
  songNumberContainer.appendChild(songNumber);
  titleContainer.appendChild(songTitle);
  durationContainer.appendChild(duration);
}
/* <div class="row align-items-center">
                  <div class="col-1">
                    <p class="text-white">1</p>
                  </div>
                  <div class="col-7"><h3 class="text-white">Titolo canzone</h3></div>
                  <div class="col-4">
                    <h3 class="d-flex justify-content-end text-white">0:00</h3>
                  </div>
                </div>
 */
