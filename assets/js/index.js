mediaQuery();

function mediaQuery() {
  if (mediaQueryMd.matches) {
    carosello();
    bannerHide();
  } else {
    playlistCard2();
  }
}
altroChePiace();
playlistCard();

function playlistCard() {
  setTimeout(() => {
    let playlists = JSON.parse(sessionStorage.getItem("playlists"));
    let cardCount = 0;
    const maxCards = 6;

    playlists.forEach((playlistId) => {
      if (cardCount >= maxCards) return;
      const arrayAlbums = playlistId.tracks.data;

      const mainRow = document.getElementById("mainRow");
      const card = document.createElement("div");
      card.classList.add("col-6", "col-md-6", "col-lg-4");
      const innerCard = document.createElement("div");
      innerCard.classList.add("card", "d-flex", "mb-3", "bg-card", "overflow-hidden", "flex-nowrap");
      innerCard.addEventListener("click", function () {
        window.location.assign(`./album.html?playlistId=${playlistId.id}`);
      });
      const cardRow = document.createElement("div");
      cardRow.classList.add("row", "g-0", "flex-nowrap");
      const containerBig = document.createElement("div");
      containerBig.classList.add("col-md-4", "w-25", "h-100");
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("d-flex", "flex-wrap", "h-100");
      imgContainer.style.cursor = "pointer";

      const img1 = document.createElement("img");
      img1.classList.add("img-fluid", "w-50", "p-0");
      img1.alt = `img1 alt`;
      img1.src = playlistId.picture_xl;
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
      cardTitle.classList.add("card-title", "text-white", "text-truncate-multiline", "titleCard");
      cardTitle.innerText = playlistId.title;
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
      // outerCardBody.addEventListener("click", function () {
      //   window.location.assign(`./album.html?albumId=${albums.picture_xl}`);
      // });
    });
  }, 500);
}

function playlistCard2() {
  setTimeout(() => {
    let playlists = JSON.parse(sessionStorage.getItem("playlists"));
    let cardCount2 = 0;
    let maxCards2 = 3;

    playlists.reverse().forEach((playlistId) => {
      if (cardCount2 >= maxCards2) return;
      const arrayAlbums = playlistId.tracks.data;

      const card = document.createElement("div");
      card.classList.add("card", "mb-3", "p-3", "bg-CardMobile");
      card.addEventListener("click", function () {
        window.location.assign(`./album.html?playlistId=${playlistId.id}`);
      });
      const row = document.createElement("div");
      row.classList.add("row", "g-0", "flex-nowrap");

      const containerBig = document.createElement("div");
      containerBig.classList.add("col-md-4", "w-25");
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("d-flex", "flex-wrap", "w-50");
      imgContainer.style.cursor = "pointer";

      const img1 = document.createElement("img");
      img1.classList.add("img-fluid", "w-50", "p-0");
      img1.alt = `img1 alt`;
      img1.src = playlistId.picture_xl;
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

      const colText = document.createElement("div");
      colText.classList.add("col-md-8");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "py-0");

      const cardText = document.createElement("p");
      cardText.classList.add("card-text", "text-gray");
      cardText.innerText = "Playlist";

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "text-white", "fs-2");
      cardTitle.innerText = playlistId.title;

      cardBody.append(cardText, cardTitle);
      colText.appendChild(cardBody);

      const actionRow = document.createElement("div");
      actionRow.classList.add("d-flex", "justify-content-between", "mt-2");

      const leftActions = document.createElement("div");
      leftActions.classList.add("d-flex", "gap-3", "algin-items-center", "pt-1");

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("bi", "bi-heart", "fs-1", "text-success");

      const dotsIcon = document.createElement("i");
      dotsIcon.classList.add("bi", "bi-three-dots-vertical", "fs-1", "text-white", "ms-4");

      leftActions.append(heartIcon, dotsIcon);

      const rightActions = document.createElement("div");
      rightActions.classList.add("d-flex", "gap-2", "align-items-center");

      const numTracks = document.createElement("p");
      numTracks.classList.add("text-gray", "mb-0");
      numTracks.innerText = `${playlistId.nb_tracks} brani`;

      const playIcon = document.createElement("i");
      playIcon.classList.add("bi", "bi-play-fill", "fs-1", "text-white", "playMobile");

      rightActions.append(numTracks, playIcon);

      // Costruzione della card
      imgContainer.appendChild(img1);
      imgContainer.appendChild(img2);
      imgContainer.appendChild(img3);
      imgContainer.appendChild(img4);

      actionRow.append(leftActions, rightActions);
      row.append(imgContainer, colText);
      card.append(row, actionRow);
      let box2 = document.querySelector(".box2");
      box2.appendChild(card);

      cardCount2++;
    });
  }, 500);
}

function bannerHide() {
  let hideBanner = document.querySelector(".hideBanner");
  let banner = document.querySelector(".banner");
  hideBanner.addEventListener("click", () => {
    if (banner.classList.contains("d-none")) {
      banner.classList.remove("d-none");
      banner.classList.add("d-md-block");
      hideBanner.innerText = "NASCONDI ANNUNCI";
    } else {
      banner.classList.add("d-none");
      banner.classList.remove("d-md-block");

      hideBanner.innerText = "MOSTRA ANNUNCI";
    }
  });
}

function altroChePiace() {
  fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=soundtracks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization: "Bearer cdd499bc73msh8003c69cf9aa9dcp12c566jsnf97718531566",
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
      const albums = data.data;
      const albumRaw = document.querySelector("#albumRaw");

      const containerRow = document.createElement("div");
      containerRow.classList.add("row", "d-flex", "gap-lg-1", "gap-md-0", "justify-content-between");
      albums.forEach((album, i) => {
        const cardAlbum = document.createElement("div");
        cardAlbum.classList.add(
          "card",
          "col-5",
          "col-md-3",
          "col-lg-2",
          "me-md-0",
          "bg-dark",
          "h-100",
          "rounded",
          "p-2",
          "d-flex",
          "flex-column",
          "m-2"
        );
        cardAlbum.style.cursor = "pointer";

        const imgAlbum = document.createElement("img");
        imgAlbum.classList.add("card-img-top", "rounded");
        imgAlbum.src = album.artist.picture_xl;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const artist = document.createElement("h6");
        artist.classList.add("card-title", "text-white", "title");
        artist.innerHTML = album.artist.name;

        const title = document.createElement("p");
        title.classList.add("card-text", "text-secondary", "text-truncate-multiline");
        title.innerHTML = album.album.title;

        cardAlbum.addEventListener("click", function () {
          window.location.assign(`./album.html?albumId=${album.album.id}`);
        });

        cardBody.appendChild(artist);
        cardBody.appendChild(title);

        cardAlbum.appendChild(imgAlbum);
        cardAlbum.appendChild(cardBody);
        cardAlbum.setAttribute("data-bs-toggle", "tooltip");
        cardAlbum.setAttribute("data-bs-placement", "top");
        cardAlbum.setAttribute("title", "Vai all'album");
        var tooltip = new bootstrap.Tooltip(cardAlbum);
        containerRow.appendChild(cardAlbum);
        albumRaw.appendChild(containerRow);

        if (i > 4) {
          cardAlbum.classList.add("hideAndShow", "d-none");
        }
      });
    })
    .finally(() => {
      let hidden = true;
      const showOthers = document.getElementById("viewAll");
      showOthers.classList.add("text-secondary");

      showOthers.innerText = "VISUALIZZA TUTTO";

      showOthers.onclick = () => {
        if (hidden === true) {
          hidden = false;
          showOthers.innerText = "NASCONDI";
          for (element of document.querySelectorAll(".hideAndShow")) {
            element.classList.remove("d-none");
          }
        } else {
          hidden = true;
          showOthers.innerText = "VISUALIZZA TUTTO";
          for (element of document.querySelectorAll(".hideAndShow")) {
            element.classList.add("d-none");
          }
        }
      };
      33333;
    });
}

function carosello() {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/1282495565", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com", // Verifica se è necessario
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Impossibile recuperare le canzoni. Riprova più tardi.");
      }
    })
    .then((data) => {
      console.log(data);
      let songs = data.tracks.data;
      songs
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .forEach((song, index) => {
          /* console.log(song) */ let carousel = document.querySelector(".carousel-inner");

          let carouselItem = document.createElement("div");

          if (index === 0) {
            carouselItem.classList.add("carousel-item", "active");
          } else {
            carouselItem.classList.add("carousel-item");
          }

          let container = document.createElement("div");
          container.classList.add("container", "d-flex", "bg-black", "p-4", "music-box", "gap-3", "banner");

          let imgDiv = document.createElement("div", "imgDiv"); //AGGIUNGERE STYLE WIDTH 350PX
          let imgBanner = document.createElement("img");
          imgBanner.src = song.album.cover_xl;
          imgBanner.classList.add("img-fluid", "imgBanner");
          imgBanner.alt = song.artist.name;

          let container2 = document.createElement("div");
          container2.classList.add("container", "text-white");

          let pAlbum = document.createElement("p");
          pAlbum.classList.add("album", "fw-bold");
          pAlbum.innerText = "ALBUM";

          let h2 = document.createElement("h2");
          h2.classList.add("fw-bold", "text-truncate");
          h2.innerText = song.title;

          let pArtist = document.createElement("p");
          pArtist.innerText = song.artist.name;
          let pText = document.createElement("p");
          pText.innerText = "Ascolta le nuove musiche di " + song.artist.name;

          let divBtn = document.createElement("div");
          divBtn.classList.add("d-flex");
          let playBtn = document.createElement("button");
          playBtn.classList.add("btn", "playBtn", "rounded-pill", "text-black", "px-4", "py-2", "me-4");
          playBtn.innerText = "Play";

          let saveBtn = document.createElement("button");
          saveBtn.classList.add(
            "btn",
            "btn-black",
            "rounded-pill",
            "text-white",
            "px-4",
            "py-2",
            "border",
            "border-secondary"
          );
          saveBtn.innerText = "Salva";

          let dropdown = document.createElement("div");
          dropdown.classList.add("dropdown");
          let dropdownButton = document.createElement("button");
          dropdownButton.classList.add("bg-transparent", "border-0", "text-secondary", "ms-3", "fs-2");
          dropdownButton.setAttribute("type", "button");
          dropdownButton.setAttribute("data-bs-toggle", "dropdown");
          dropdownButton.setAttribute("aria-expanded", "false");

          let icon = document.createElement("i");
          icon.classList.add("fa-solid", "fa-ellipsis");
          dropdownButton.appendChild(icon);

          let dropdownMenu = document.createElement("ul");
          dropdownMenu.classList.add("dropdown-menu");

          let actions = ["Action", "Another action", "Something else here"];
          actions.forEach((actionText) => {
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.classList.add("dropdown-item", "text-white");
            link.setAttribute("href", "#");
            link.innerText = actionText;

            listItem.appendChild(link);
            dropdownMenu.appendChild(listItem);
          });

          let dropdownDiv = document.createElement("div");
          dropdownDiv.classList.add("dropdown");

          carousel.appendChild(carouselItem);
          carouselItem.appendChild(container);
          container.append(imgDiv, container2);

          imgDiv.appendChild(imgBanner);

          container2.append(pAlbum, h2, pArtist, pText, divBtn);
          dropdownDiv.appendChild(dropdownButton);
          dropdownDiv.appendChild(dropdownMenu);
          divBtn.append(playBtn, saveBtn, dropdownDiv);
        });
    });
}
