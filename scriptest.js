const arrayPlaylist = [8454338222, 13015611143, 248297032, 1976454162, 2298075882, 8606835902, 2153050122];
let cardCount = 0;
const maxCards = 6;
arrayPlaylist.forEach((playlistId) => {
  if (cardCount >= maxCards) return;
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
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
      if (cardCount >= maxCards) return;
      const albums = data;
      const arrayAlbums = data.tracks.data;
      console.log(albums);
      console.log(arrayAlbums);
      console.log(albums.picture_xl);

      const mainRow = document.getElementById("mainRow");
      //console.log(album);
      const card = document.createElement("div");
      card.classList.add("col-4");
      const innerCard = document.createElement("div");
      innerCard.classList.add("card", "mb-3", "bg-secondary", "overflow-hidden");
      const cardRow = document.createElement("div");
      cardRow.classList.add("row", "g-0");
      const containerBig = document.createElement("div");
      containerBig.classList.add("col-md-4");
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("d-flex", "flex-wrap", "h-100");
      imgContainer.style.cursor = "pointer";

      imgContainer.addEventListener("click", function () {
        window.location.assign(`./album.html?albumId=${albums.id}`);
      });
      const img1 = document.createElement("img");
      img1.classList.add("img-fluid", "w-50", "p-0");
      img1.alt = `img1 alt`;
      img1.src = albums.picture_xl;
      const img2 = document.createElement("img");

      img2.classList.add("img-fluid", "w-50", "p-0");
      img2.alt = `img2 alt`;
      img2.src = "";
      const img3 = document.createElement("img");
      img3.classList.add("img-fluid", "w-50", "p-0");
      img3.alt = `img3 alt`;
      img3.src = "./assets/imgs/main/image-10.jpg";
      const img4 = document.createElement("img");
      img4.classList.add("img-fluid", "w-50", "p-0");
      img4.alt = `img4 alt`;
      img4.src = "./assets/imgs/main/image-10.jpg";
      for (let index = 0; index < arrayAlbums.length; index++) {
        img1.src = arrayAlbums[0].album.cover_xl;
        img2.src = arrayAlbums[1].album.cover_xl;
        img3.src = arrayAlbums[2].album.cover_xl;
        img4.src = arrayAlbums[3].album.cover_xl;
      }
      const outerCardBody = document.createElement("div");
      outerCardBody.classList.add("col-md-8", "d-flex", "align-items-center");
      outerCardBody.style.cursor = "pointer";
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "text-white", "text-truncate-multiline");
      cardTitle.innerText = albums.title;
      mainRow.appendChild(card);
      card.appendChild(innerCard);
      innerCard.appendChild(cardRow);
      cardRow.appendChild(containerBig);
      containerBig.appendChild(imgContainer);
      imgContainer.appendChild(img1);
      imgContainer.appendChild(img2);
      imgContainer.appendChild(img3);
      imgContainer.appendChild(img4);
      cardRow.appendChild(outerCardBody);
      outerCardBody.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardCount++;
      outerCardBody.addEventListener("click", function () {
        window.location.assign(`./album.html?albumId=${albums.picture_xl}`);
      });
    });
});
