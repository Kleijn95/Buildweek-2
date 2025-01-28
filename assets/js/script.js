let hide = document.querySelector(".hide");
let banner = document.querySelector(".banner");
let like = document.querySelector(".like");
let dislike = document.querySelector(".dislike");
let volume = document.querySelector(".volume");
let noVolume = document.querySelector(".noVolume");

let aside = document.querySelector("aside");
let closeAside = document.querySelector(".closeAside");

let showAside = document.querySelector(".showAside");

hide.addEventListener("click", () => {
  if (banner.classList.contains("d-none")) {
    banner.classList.remove("d-none");
    hide.innerText = "NASCONDI ANNUNCI";
  } else {
    banner.classList.add("d-none");
    hide.innerText = "MOSTRA ANNUNCI";
  }
});

like.addEventListener("click", () => {
  like.classList.add("d-none");
  dislike.classList.remove("d-none");
});
dislike.addEventListener("click", () => {
  like.classList.remove("d-none");
  dislike.classList.add("d-none");
});
volume.addEventListener("click", () => {
  volume.classList.add("d-none");
  noVolume.classList.remove("d-none");
});
noVolume.addEventListener("click", () => {
  volume.classList.remove("d-none");
  noVolume.classList.add("d-none");
});

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

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=rap", {
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

    albums.slice(0, 6).forEach((album) => {
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
        window.location.assign(`./album.html?albumId=${album.album.id}`);
      });
      const img1 = document.createElement("img");
      img1.classList.add("img-fluid", "w-50", "p-0");
      img1.alt = `img1 alt`;
      img1.src = album.album.cover_xl;
      const img2 = document.createElement("img");
      img2.classList.add("img-fluid", "w-50", "p-0");
      img2.alt = `img2 alt`;
      img2.src = "./assets/imgs/main/image-10.jpg";
      const img3 = document.createElement("img");
      img3.classList.add("img-fluid", "w-50", "p-0");
      img3.alt = `img3 alt`;
      img3.src = "./assets/imgs/main/image-10.jpg";
      const img4 = document.createElement("img");
      img4.classList.add("img-fluid", "w-50", "p-0");
      img4.alt = `img4 alt`;
      img4.src = "./assets/imgs/main/image-10.jpg";

      const outerCardBody = document.createElement("div");
      outerCardBody.classList.add("col-md-8", "d-flex", "align-items-center");
      outerCardBody.style.cursor = "pointer";
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title", "text-white", "text-truncate-multiline");
      cardTitle.innerText = album.album.title;

      outerCardBody.addEventListener("click", function () {
        window.location.assign(`./album.html?albumId=${album.album.id}`);
      });

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
    });
  });

fetch(" https://striveschool-api.herokuapp.com/api/deezer/search?q=rap", {
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
    const albums = data.data;
    const albumRaw = document.querySelector("#albumRaw");
    //Creazione card nella ezione "altro di ciò che ti piace"
    const containerRow = document.createElement("div");
    containerRow.classList.add("row", "d-felx", "gap-1", "justify-content-between");
    albums.forEach((album) => {
      const cardAlbum = document.createElement("div");
      cardAlbum.classList.add("card", "col-2", "bg-dark", "h-100", "rounded", "p-2", "d-flex", "flex-column", "m-2");
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

      containerRow.appendChild(cardAlbum);
      albumRaw.appendChild(containerRow);

      console.log(album);
    });
  });

//CAROSELLO

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/119606", {
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
      throw new Error("Impossibile recuperare le canzoni. Riprova più tardi.");
    }
  })
  .then((data) => {
    let songs = data.tracks.data;
    songs
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
      .forEach((song, index) => {
        console.log(song);
        let carousel = document.querySelector(".carousel-inner");

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
        h2.classList.add("fw-bold");
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
