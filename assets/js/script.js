let hide = document.querySelector(".hide");
let banner = document.querySelector(".banner");
let show = document.querySelector(".show");
let showBanner = document.querySelector(".showBan");

hide.addEventListener("click", () => {
  banner.classList.add("d-none");
  showBanner.classList.remove("d-none");

  show.addEventListener("click", () => {
    banner.classList.remove("d-none");
    showBanner.classList.add("d-none");
  });
});

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=rap", {
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
    const albums = data.data; // Assumi che la risposta sia un array di album in "data"
    const row = document.getElementById("albumsList");
    row.innerHTML = ""; // Pulisce la riga per evitare duplicazioni

    albums.slice(0, 6).forEach((album) => {
      console.log(album.album.cover_xl);
      // Crea dinamicamente gli elementi
      const col = document.createElement("div");
      col.className = "col-4";
      console.log(album.album.cover_xl);

      const card = document.createElement("div");
      card.className = "card mb-3 bg-dark";
      card.style.maxWidth = "540px";

      const rowDiv = document.createElement("div");
      rowDiv.className = "row g-0";

      const colImg = document.createElement("div");
      colImg.className = "col-md-4";

      const img = document.createElement("img");
      img.src = album.album.cover_xl; // Immagine dall'album
      img.alt = album.album.title;
      img.className = "img-fluid w-100";

      colImg.appendChild(img);

      const colBody = document.createElement("div");
      colBody.className = "col-md-8 d-flex align-items-center";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title text-white";
      title.textContent = album.album.title; // Titolo dell'album

      cardBody.appendChild(title);
      colBody.appendChild(cardBody);
      rowDiv.appendChild(colImg);
      rowDiv.appendChild(colBody);
      card.appendChild(rowDiv);
      col.appendChild(card);

      row.appendChild(col); // Aggiungi al contenitore
    });
  });
