const mediaQueryMd = window.matchMedia("(min-width: 769px)");
const mediaQuerySm = window.matchMedia("(max-width: 768px)");

mediaQuery();

function mediaQuery() {
  if (mediaQueryMd.matches) {
    createHeaderLg();
    playlistNav();
    createAside();
    toggleAside();
  } else {
    createHeaderSm();
    createAsideSm();
    toggleAsideSm();
  }
}

//Header
function createHeaderLg() {
  let header = document.querySelector("header");
  header.classList.add("col-lg-2", "col-md-3", "px-0", "bg-black", "pt-4");

  let sidebar = document.createElement("div");
  sidebar.classList.add("d-flex", "flex-column", "h-100", "sidebar");

  let nav = document.createElement("nav");
  nav.classList.add("navbar", "navbar-expand-lg");

  let containerFluid = document.createElement("div");
  containerFluid.classList.add("container-fluid");

  let navbarSupportedContent = document.createElement("div");
  navbarSupportedContent.id = "navbarSupportedContent";

  let ul = document.createElement("ul");
  ul.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0", "d-flex", "flex-column");

  //Home
  let homeItem = document.createElement("li");
  homeItem.classList.add("nav-item");

  let homeLink = document.createElement("a");
  homeLink.classList.add("nav-link", "active", "text-white", "px-0", "d-flex", "align-items-center");
  homeLink.href = "./index.html";

  let homeText = document.createElement("p");
  homeText.innerText = "Home";
  homeText.classList.add("mb-0");

  let homeIcon = document.createElement("i");
  homeIcon.classList.add("fa-solid", "fa-house", "me-3", "iconNav");

  homeLink.append(homeIcon, homeText);
  homeItem.appendChild(homeLink);
  ul.appendChild(homeItem);

  //Search
  let searchItem = document.createElement("li");
  searchItem.classList.add("nav-item");

  let searchLink = document.createElement("a");
  searchLink.classList.add("nav-link", "px-0");
  searchLink.href = "#";

  let searchButton = document.createElement("button");
  searchButton.classList.add("btn", "p-0");
  searchButton.type = "button";
  searchButton.onclick = () => {
    window.location.assign(`./search.html`);
  };

  let searchP = document.createElement("p");
  searchP.classList.add("text-gray", "m-0", "searchP", "d-flex");

  let searchIcon = document.createElement("i");
  searchIcon.classList.add("fa", "fa-magnifying-glass", "me-3", "iconNav");

  let searchText = document.createElement("p");
  searchText.innerText = "Cerca";
  searchText.classList.add("mb-0");

  searchP.appendChild(searchIcon);
  searchP.appendChild(searchText);
  searchButton.appendChild(searchP);
  searchLink.appendChild(searchButton);
  searchItem.appendChild(searchLink);
  ul.appendChild(searchItem);

  //Libreria
  let library = document.createElement("li");
  library.classList.add("nav-item", "py-0");

  let libraryItem = document.createElement("a");
  library.classList.add("nav-link", "text-gray", "px-0");
  library.href = "#";

  libraryItem.innerHTML = `<a class="nav-link text-gray px-0" href="#"
  ><svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    class="Svg-sc-ytk21e-0 bneLcE e-9541-icon"
    viewBox="0 0 24 24"
    style="width: 22px; fill: #abb0ad"
  >
    <path
      d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
    ></path>
  </svg>
  La tua libreria</a
>`;

  library.appendChild(libraryItem);
  ul.appendChild(library);

  let ul2 = document.createElement("ul");
  ul2.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0", "d-flex", "flex-column", "mt-5");

  // Playlist
  let playlistItem = document.createElement("li");
  playlistItem.classList.add("nav-item", "d-flex");

  let playlistLink = document.createElement("a");
  playlistLink.classList.add("nav-link", "text-gray", "px-0", "d-flex", "align-items-center");
  playlistLink.href = "#";

  let playlistIcon = document.createElement("i");
  playlistIcon.classList.add("fa-solid", "fa-plus", "me-3", "iconNav", "rounded-1", "bg-secondary", "text-black");

  playlistLink.appendChild(playlistIcon);
  playlistLink.appendChild(document.createTextNode("Crea playlist"));
  playlistItem.appendChild(playlistLink);
  ul2.appendChild(playlistItem);

  // Brani che ti piacciono
  let likedSongsItem = document.createElement("li");
  likedSongsItem.classList.add("nav-item");

  let likedSongsLink = document.createElement("a");
  likedSongsLink.classList.add("nav-link", "text-gray", "px-0", "d-flex", "align-items-center");
  likedSongsLink.href = "#";

  let likedSongsIcon = document.createElement("i");
  likedSongsIcon.classList.add("fa-solid", "me-3", "heart", "fa-heart", "iconNav", "rounded-1");

  likedSongsLink.appendChild(likedSongsIcon);
  likedSongsLink.appendChild(document.createTextNode("Brani che ti piacciono"));
  likedSongsItem.appendChild(likedSongsLink);
  ul2.appendChild(likedSongsItem);

  // Episodi
  let episodesItem = document.createElement("li");
  episodesItem.classList.add("nav-item");

  let episodesLink = document.createElement("a");
  episodesLink.classList.add("nav-link", "text-gray", "px-0", "d-flex", "align-items-center");
  episodesLink.href = "#";

  let episodesIcon = document.createElement("i");
  episodesIcon.classList.add("fas", "fa-bookmark", "me-3", "bg-success", "iconNav", "rounded-1");
  episodesIcon.style.color = "#27ddaa";

  episodesLink.appendChild(episodesIcon);
  episodesLink.appendChild(document.createTextNode("I tuoi episodi"));
  episodesItem.appendChild(episodesLink);
  ul2.appendChild(episodesItem);

  navbarSupportedContent.append(ul, ul2);
  containerFluid.appendChild(navbarSupportedContent);
  nav.appendChild(containerFluid);

  // Linea divisoria
  let hr = document.createElement("hr");
  hr.classList.add("text-white", "mx-auto");
  hr.style = "width:90%";

  // Sezione playlist
  let playlistContainer = document.createElement("div");
  playlistContainer.classList.add("container", "overflow-y-scroll", "container-playlist");
  let playlistsNav = document.createElement("div");
  playlistsNav.classList.add("playlists", "text-gray", "bg-black");
  playlistContainer.appendChild(playlistsNav);

  // Aggiunta della sidebar all'header
  sidebar.append(nav, hr, playlistContainer);
  header.appendChild(sidebar);
}

function createHeaderSm() {
  let header = document.querySelector("header");

  header.classList.add("fixed-bottom", "bg-headerMobile", "py-2");

  let nav = document.createElement("nav");
  nav.classList.add("navbar", "container-fluid");

  let divContainer = document.createElement("div");
  divContainer.classList.add("container-fluid", "d-flex");

  // Home link
  let homeLink = document.createElement("a");
  homeLink.classList.add("nav-link", "active", "text-white", "d-flex", "flex-column", "align-items-center");
  homeLink.href = "./index.html";

  let homeIcon = document.createElement("i");
  homeIcon.classList.add("fa-solid", "fa-house", "iconNav", "fs-1");

  let homeText = document.createElement("p");
  homeText.classList.add("mb-0");
  homeText.textContent = "Home";

  homeLink.appendChild(homeIcon);
  homeLink.appendChild(homeText);

  let searchLink = document.createElement("a");
  searchLink.classList.add("nav-link", "px-0");
  searchLink.href = "#";

  let searchButton = document.createElement("button");
  searchButton.classList.add("btn", "d-flex", "flex-column", "align-items-center");
  searchButton.type = "button";

  let searchText = document.createElement("p");
  searchText.classList.add("text-gray", "d-flex", "flex-column", "align-items-center", "mb-0");

  let searchIcon = document.createElement("i");
  searchIcon.classList.add("fa", "fa-magnifying-glass", "iconNav", "fs-1");

  let searchLabel = document.createElement("span");
  searchLabel.classList.add("mb-0");
  searchLabel.textContent = "Cerca";

  searchText.appendChild(searchIcon);
  searchText.appendChild(searchLabel);
  searchButton.appendChild(searchText);
  searchLink.appendChild(searchButton);

  searchButton.onclick = () => {
    window.location.assign(`./search.html`);
  };

  let libraryLink = document.createElement("a");
  libraryLink.classList.add("nav-link", "text-gray", "px-0", "d-flex", "flex-column", "align-items-center");
  libraryLink.href = "#";

  let libraryIcon = document.createElement("div");
  libraryIcon.innerHTML = `
    <svg data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE e-9541-icon" viewBox="0 0 24 24" style="width: 35px; fill: #abb0ad">
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
    </svg>
  `;

  let libraryText = document.createElement("span");
  libraryText.textContent = "La tua libreria";

  libraryLink.appendChild(libraryIcon);
  libraryLink.appendChild(libraryText);

  divContainer.appendChild(homeLink);
  divContainer.appendChild(searchLink);
  divContainer.appendChild(libraryLink);

  nav.appendChild(divContainer);
  header.appendChild(nav);
}

function playlistNav() {
  fetch("./assets/js/playlists.json")
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Impossibile recuperare gli album. Riprova più tardi.");
      }
    })
    .then((data) => {
      console.log(data);
      sessionStorage.setItem("playlists", JSON.stringify(data));
    })
    .finally(() => {
      playlistsBar();
    });

  function playlistsBar() {
    let playlists = JSON.parse(sessionStorage.getItem("playlists"));
    playlists.forEach((playlistId) => {
      let placeholderPlaylist = document.querySelector(".playlists");

      let pPlaylist = document.createElement("p");
      pPlaylist.style.cursor = "pointer";
      pPlaylist.innerText = playlistId.title;

      // Aggiunge l'evento click solo a questo <p>
      pPlaylist.addEventListener("click", function () {
        window.location.assign(`./album.html?playlistId=${playlistId.id}`);
      });

      placeholderPlaylist.appendChild(pPlaylist);
    });
  }
}
//Aside
function createAside() {
  let aside = document.querySelector("aside");
  aside.classList.add("col-lg-2", "bg-black");

  let container = document.createElement("div");
  container.classList.add("container", "pt-4", "ps-1", "pe-0");

  let activities = document.createElement("div");
  activities.classList.add("d-flex", "justify-content-between", "align-items-center");

  let title = document.createElement("h3");
  title.classList.add("text-white", "mb-0");
  title.innerText = "Attività amici";

  let controls = document.createElement("div");
  controls.classList.add("text-secondary", "d-flex", "flex-nowrap");

  let userGroupButton = document.createElement("button");
  userGroupButton.classList.add("asideBtn", "bg-transparent", "border-0", "d-none", "d-lg-block");

  let userGroupIcon = document.createElement("i");
  userGroupIcon.classList.add("fa-solid", "fa-user-group", "text-gray", "me-1");
  userGroupButton.appendChild(userGroupIcon);

  let closeButton = document.createElement("button");
  closeButton.classList.add("asideBtn", "bg-transparent", "border-0", "closeAside");

  let closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-x", "text-gray");

  let notifications = document.createElement("div");
  notifications.innerHTML = `<div class="container mt-5 text-gray notifications ps-1 pe-0">
            <div class="d-flex justify-content-between gap-1">
              <div class="d-flex gap-2">
                <img
                  style="width: 35px; height: 35px; border-radius: 50%"
                  class="img-fluid"
                  src="./assets/imgs/search/image-11.jpg"
                />
                <div>
                  <h4 class="mb-0 fw-bold notificationText overflow-hidden text-truncate">Charlie Hookham</h4>
                  <p class="mb-1 notificationText">In Camera - Yumi Zouma</p>
                  <p><i class="fas fa-music me-1" style="color: #ffffff"></i> EP III</p>
                </div>
              </div>
              <p class="time d-none">4 ore</p>
            </div>
            <div class="d-flex justify-content-between gap-1 mt-3">
              <div class="d-flex gap-2">
                <img
                  style="width: 35px; height: 35px; border-radius: 50%"
                  class="img-fluid"
                  src="./assets/imgs/search/image-12.jpg"
                />
                <div>
                  <h4 class="mb-0 fw-bold notificationText">lightdark02</h4>
                  <p class="mb-1 notificationText">Aimed to kill - Jared LeMac</p>
                  <p><i class="fas fa-music me-1" style="color: #ffffff"></i> Aimed to Kill</p>
                </div>
              </div>
              <p class="time d-none">8 ore</p>
            </div>
            <div class="d-flex justify-content-between gap-1 mt-3">
              <div class="d-flex gap-2">
                <img
                  style="width: 35px; height: 35px; border-radius: 50%"
                  class="img-fluid"
                  src="./assets/imgs/search/image-15.jpg"
                />
                <div>
                  <h4 class="mb-0 fw-bold notificationText">Valeria Traverso</h4>
                  <p class="mb-1 notificationText">New Kings - Sleeping Wolf</p>
                  <p><i class="fas fa-music me-1" style="color: #ffffff"></i>Twint Badass mood</p>
                </div>
              </div>
              <p class="time d-none">3 giorni</p>
            </div>
          </div>`;

  closeButton.appendChild(closeIcon);

  controls.append(userGroupButton, closeButton);

  activities.append(title, controls);

  container.append(activities, notifications);
  aside.appendChild(container);
}

function createAsideSm() {
  let aside = document.querySelector("aside");
  let body = document.querySelector("body");
  let div = document.querySelector("aside > div");
  let username = document.querySelector("main > div > div");

  username.classList.add("d-none");

  aside.classList.add("position-absolute", "text-white");
  div.innerHTML = `<i class="bi bi-bell fs-1"></i>
            <i class="bi bi-clock fs-1 mx-4"></i>
            <i class="bi bi-gear fs-1"></i>`;

  let notify = document.createElement("div");
  notify.classList.add(
    "bg-black",
    "d-none",
    "position-absolute",
    "top-0",
    "start-0",
    "notify",
    "w-100",
    "h-100",
    "p-4"
  );

  let container = document.createElement("div");
  container.classList.add("container", "pt-4", "ps-1", "pe-0");

  let activities = document.createElement("div");
  activities.classList.add("d-flex", "justify-content-between", "align-items-center");

  let title = document.createElement("h3");
  title.classList.add("text-white", "mb-0");
  title.innerText = "Attività amici";

  let controls = document.createElement("div");
  controls.classList.add("text-secondary", "d-flex", "flex-nowrap");

  let userGroupButton = document.createElement("button");
  userGroupButton.classList.add("asideBtn", "bg-transparent", "border-0", "d-none", "d-lg-block");

  let userGroupIcon = document.createElement("i");
  userGroupIcon.classList.add("fa-solid", "fa-user-group", "text-gray", "me-1");
  userGroupButton.appendChild(userGroupIcon);

  let closeButton = document.createElement("button");
  closeButton.classList.add("asideBtn", "bg-transparent", "border-0", "closeAside");

  let closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-x", "text-gray", "fs-1");

  let notifications = document.createElement("div");
  notifications.innerHTML = `<div class="container mt-5 text-gray notifications ps-1 pe-0">
                      <div class="d-flex justify-content-between gap-1">
                        <div class="d-flex gap-2">
                          <img
                            style="width: 35px; height: 35px; border-radius: 50%"
                            class="img-fluid"
                            src="./assets/imgs/search/image-11.jpg"
                          />
                          <div>
                            <h4 class="mb-0 fw-bold notificationText overflow-hidden text-truncate">Charlie Hookham</h4>
                            <p class="mb-1 notificationText">In Camera - Yumi Zouma</p>
                            <p><i class="fas fa-music me-1" style="color: #ffffff"></i> EP III</p>
                          </div>
                        </div>
                        <p class="time">4 ore</p>
                      </div>
                      <div class="d-flex justify-content-between gap-1 mt-3">
                        <div class="d-flex gap-2">
                          <img
                            style="width: 35px; height: 35px; border-radius: 50%"
                            class="img-fluid"
                            src="./assets/imgs/search/image-12.jpg"
                          />
                          <div>
                            <h4 class="mb-0 fw-bold notificationText">lightdark02</h4>
                            <p class="mb-1 notificationText">Aimed to kill - Jared LeMac</p>
                            <p><i class="fas fa-music me-1" style="color: #ffffff"></i> Aimed to Kill</p>
                          </div>
                        </div>
                        <p class="time">8 ore</p>
                      </div>
                      <div class="d-flex justify-content-between gap-1 mt-3">
                        <div class="d-flex gap-2">
                          <img
                            style="width: 35px; height: 35px; border-radius: 50%"
                            class="img-fluid"
                            src="./assets/imgs/search/image-15.jpg"
                          />
                          <div>
                            <h4 class="mb-0 fw-bold notificationText">Valeria Traverso</h4>
                            <p class="mb-1 notificationText">New Kings - Sleeping Wolf</p>
                            <p><i class="fas fa-music me-1" style="color: #ffffff"></i>Twint Badass mood</p>
                          </div>
                        </div>
                        <p class="time">3 giorni</p>
                      </div>
                    </div>`;

  closeButton.appendChild(closeIcon);

  controls.append(userGroupButton, closeButton);

  activities.append(title, controls);

  container.append(activities, notifications);
  notify.appendChild(container);
  body.appendChild(notify);
}

function toggleAside() {
  let aside = document.querySelector("aside");
  let closeAside = document.querySelector(".closeAside");

  let showAside = document.querySelector(".showAside");

  closeAside.addEventListener("click", () => {
    aside.classList.add("d-none");
    if (window.location.pathname.endsWith("index.html")) {
      let hideDiv = document.querySelector(".hideDiv");
      hideDiv.classList.add("hideDiv2");
    }
  });

  showAside.addEventListener("click", () => {
    if (aside.classList.contains("d-none")) {
      aside.classList.remove("d-none");

      if (window.location.pathname.endsWith("index.html")) {
        let hideDiv = document.querySelector(".hideDiv");
        hideDiv.classList.remove("hideDiv2");
      }
    } else {
      aside.classList.add("d-none");
      if (wwindow.location.pathname.endsWith("index.html")) {
        hideDiv.classList.add("hideDiv2");
      }
    }
  });
}

function toggleAsideSm() {
  let notifyBtn = document.querySelector(".bi-bell");
  let notify = document.querySelector(".notify");

  notifyBtn.addEventListener("click", () => {
    notify.classList.remove("d-none");
  });
  let closeAside = document.querySelector(".closeAside");
  closeAside.addEventListener("click", () => {
    notify.classList.add("d-none");
  });
}
