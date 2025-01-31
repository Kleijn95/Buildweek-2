let playerNav = document.querySelector(".player");
playerNav.innerHTML = `<div class="container-fluid">
<div class="d-flex align-items-center gap-2 overflow-x-visible" style="width:250px">
  <img
    src="./assets/imgs/4b135b9f16b30caa386a32c6a64990c9.png"
    class="song hideMobile imgPlayer spotify"
    id="defaultImg"
    alt=""
  />
  <div class="playerSong"></div>
  <div>
    <h6 class="text-white m-0 titolo">Lose Yourself</h6>
    <p class="text-secondary m-0 subtitle artista hideMobile">Eminem</p>
  </div>
  <button class="btn btn-link text-secondary p-0 like d-none">
    <i class="far fa-heart hideMobile"></i>
  </button>
  <button class="btn btn-link text-secondary p-0 d-none dislike">
    <i class="fas fa-heart hideMobile"></i>
  </button>
</div>
<div class="row-column">
  <div class="d-block d-md-none d-flex">
    <!-- PER VERSIONI MOBILE -->
    <button class="btn btn-link text-gray fs-1 p-0"><i class="bi bi-pc-display"></i></button>
    <button class="btn btn-link text-secondary p-0 like">
      <i class="far fa-heart fs-1 mx-4"></i>
    </button>
    <button class="btn btn-link text-secondary p-0 d-none dislike">
      <i class="fas fa-heart fs-1 mx-4"></i>
    </button>
    <button class="btn btn-link text-white p-0 start2">
      <i class="far fa-play-circle fa-2x"></i>
    </button>
    <button class="btn btn-link text-white p-0  d-none pausa2">
      <i class="bi bi-pause-circle  fs-1"></i>
    </button>
  </div>
  <div class="d-flex justify-content-center align-items-center gap-3 flex-grow-1 hideMobile">
    <button class="btn btn-link text-success p-0">
      <i class="fas fa-random"></i>
    </button>
    <button class="btn btn-link text-secondary p-0 back">
      <i class="fas fa-step-backward back"></i>
    </button>
    <button class="btn btn-link text-white p-0 start">
      <i class="far fa-play-circle fa-2x"></i>
    </button>
    <button class="btn btn-link text-white p-0 d-none pausa">
      <i class="far fa-pause-circle fa-2x"></i>
    </button>
    <button class="btn btn-link text-secondary p-0 next">
      <i class="fas fa-step-forward"></i>
    </button>
    <button class="btn btn-link text-success p-0">
      <i class="fas fa-history"></i>
    </button>
  </div>
  <div class="d-flex flex-nowrap justify-content-center align-items-center hideMobile">
     <span class="timeSongStyle">00:00</span>
    <input class="slider-track-input mousetrap mx-2" id="progressBar" type="range" step="1" style="width: 100%" value="0" />
    <span class="timeSong timeSongStyle">00:00</span>
  </div>
</div>

<div class="d-flex gap-3 hideMobile">
  <button class="btn btn-link text-white p-0">
    <i class="fas fa-microphone-alt"></i>
  </button>

  <button class="btn btn-link text-white p-0"><i class="fas fa-list"></i></button>

  <button class="btn btn-link text-white p-0"><i class="bi bi-speaker"></i></button>
  <button class="btn btn-link text-white p-0 volume"><i class="fas fa-volume-up"></i></button>
  <button class="btn btn-link text-white p-0 d-none noVolume">
    <i class="fas fa-volume-mute"></i>
  </button>
  <div>
    <input class="slider-track-input mousetrap barraVolume" type="range" min="0" max="10" disabled />
  </div>
  <button class="btn btn-link text-white p-0"><i class="fas fa-expand-alt"></i></button>
</div>
</div>`;

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

let playlistPlayer = [];

//Variabile per l'audio
let audio = new Audio();
//Variabile che si aggiorna se un audio è in riproduzione
let currentAudio = null;

let progressBar = document.querySelector("#progressBar");

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

//Variabile per imgPlayer
let imgPlayer = document.querySelector(".imgPlayer");
//Variabile che tine conto dell'immagine nel player
let currentImg = null;

let titlePlayer = document.querySelector(".titolo");
let artistPlayer = document.querySelector(".artista");

let currentTitlePlayer = null;
let currentArtistPlayer = null;
let currentIndex = 0;

let player = document.querySelector(".playerSong");

let logo = document.querySelector(".spotify");

let like = document.querySelector(".like");
let dislike = document.querySelector(".dislike");
let volume = document.querySelector(".volume");
let noVolume = document.querySelector(".noVolume");

let barraVolume = document.querySelector(".barraVolume");
let timeSong = document.querySelector(".timeSong");

let start = document.querySelector(".start");
let startGreen = document.querySelector(".playGreen");
let pause = document.querySelector(".pausa");
let pauseGreen = document.querySelector(".pauseGreen");
let start2 = document.querySelector(".start2");
let pause2 = document.querySelector(".pausa2");

let next = document.querySelector(".next");
let back = document.querySelector(".back");
//Fine elementi player
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

//Funzione per far partire le canzoni
function playSong(songData) {
  if (currentAudio === songData.preview) {
    if (!audio.paused) {
      audio.pause();
      pause.classList.add("d-none");
      start.classList.remove("d-none");
      pause2.classList.add("d-none");
      start2.classList.remove("d-none");
    } else {
      audio.play();
      barraVolume.disabled = false;
      timeSong.innerHTML = formatDuration(songData.duration);
    }
  } else {
    audio.src = songData.preview;
    audio.play();
    currentAudio = songData.preview;
    barraVolume.disabled = false;
    timeSong.innerHTML = formatDuration(songData.duration);
    start.classList.add("d-none");
    pause.classList.remove("d-none");
    start2.classList.add("d-none");
    pause2.classList.remove("d-none");

    titlePlayer.innerText = songData.title;
    artistPlayer.innerText = songData.artist;
    imgPlayer.src = songData.cover;
  }
}

//Funzione per il tasto play
function noVol() {
  if (!audio.paused) {
    volume.classList.add("d-none");
    noVolume.classList.remove("d-none");
    audio.muted = true;
    barraVolume.max = "";
    barraVolume.disabled = true;
  }
}
function vol() {
  if (!audio.paused) {
    volume.classList.remove("d-none");
    noVolume.classList.add("d-none");
    audio.muted = false;
    barraVolume.disabled = false;
    barraVolume.max = "10";
  }
}
console.log(playlistPlayer);

function nextSong() {
  if (currentIndex < playlistPlayer.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  let songData = {
    preview: playlistPlayer[currentIndex].preview,
    title: playlistPlayer[currentIndex].title,
    artist: playlistPlayer[currentIndex].artist.name,
    cover: playlistPlayer[currentIndex].album.cover_small,
    duration: playlistPlayer[currentIndex].duration,
  };
  playSong(songData);
  console.log(playlistPlayer[currentIndex]);
}

function backSong() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = playlistPlayer.length - 1;
  }
  let songData = {
    preview: playlistPlayer[currentIndex].preview,
    title: playlistPlayer[currentIndex].title,
    artist: playlistPlayer[currentIndex].artist.name,
    cover: playlistPlayer[currentIndex].album.cover_small,
    duration: playlistPlayer[currentIndex].duration,
  };
  playSong(songData);
}

volume.addEventListener("click", () => {
  noVol();
});
noVolume.addEventListener("click", () => {
  vol();
});

start.addEventListener("click", () => {
  if (playlistPlayer.length > 0) {
    start.classList.add("d-none");
    pause.classList.remove("d-none");
  }
  let songData = {
    preview: playlistPlayer[currentIndex].preview,
    title: playlistPlayer[currentIndex].title,
    artist: playlistPlayer[currentIndex].artist.name,
    cover: playlistPlayer[currentIndex].album.cover_small,
    duration: playlistPlayer[currentIndex].duration,
  };
  let song = document.querySelectorAll(".songTitle");
  for (element of document.querySelectorAll(".songTitle")) {
    element.classList.remove("text-success");
    element.classList.add("text-white");
  }
  song[currentIndex].classList.remove("text-white");
  song[currentIndex].classList.add("text-success");
  playSong(songData);
});
startGreen.addEventListener("click", () => {
  if (playlistPlayer.length > 0) {
    playSong(playlistPlayer[currentIndex]);
    startGreen.classList.add("d-none");
    pauseGreen.classList.remove("d-none");

    let song = document.querySelectorAll(".songTitle");
    for (element of document.querySelectorAll(".songTitle")) {
      element.classList.remove("text-success");
      element.classList.add("text-white");
    }
    song[currentIndex].classList.remove("text-white");
    song[currentIndex].classList.add("text-success");
  }
});

pause.addEventListener("click", () => {
  audio.pause();
  start.classList.remove("d-none");
  pause.classList.add("d-none");
});
pauseGreen.addEventListener("click", () => {
  audio.pause();
  startGreen.classList.remove("d-none");
  pauseGreen.classList.add("d-none");
});

pause2.addEventListener("click", () => {
  audio.pause();
  start2.classList.remove("d-none");
  pause2.classList.add("d-none");
});

start2.addEventListener("click", () => {
  if (playlistPlayer.length > 0) {
    playSong(playlistPlayer[currentIndex]);
    start2.classList.add("d-none");
    pause2.classList.remove("d-none");
  }
});

next.addEventListener("click", () => {
  let song = document.querySelectorAll(".songTitle");
  if (currentIndex < song.length - 1) {
    for (element of document.querySelectorAll(".songTitle")) {
      element.classList.remove("text-success");
      element.classList.add("text-white");
    }

    song[currentIndex + 1].classList.remove("text-white");
    song[currentIndex + 1].classList.add("text-success");
    nextSong();
  }
  //console.log(currentAudio);
});

back.addEventListener("click", () => {
  let song = document.querySelectorAll(".songTitle");
  if (currentIndex > 0) {
    for (element of document.querySelectorAll(".songTitle")) {
      element.classList.remove("text-success");
      element.classList.add("text-white");
    }

    song[currentIndex - 1].classList.remove("text-white");
    song[currentIndex - 1].classList.add("text-success");
    backSong();
  }
});

barraVolume.addEventListener("input", () => {
  audio.volume = barraVolume.value / 10;
});
///////////////////// Preset per caricare le canzoni dalle fetch. Bisogna cambiare i dati di conseguenza
/* songTitle.addEventListener("click", () => {
    let songData = {
      preview: album[i].preview,
      title: album[i].title,
      artist: album[i].artist.name,
      cover: album[i].album.cover_small,
      duration: album[i].duration,
      index: i,
    };

    playSong(songData);
}) */
//////////////////////

//Funzione per far partire le canzoni    Nel caso serva ho lasciato qui quello precedente
/* function playSong(previewUrl, index) {
    if (currentAudio === previewUrl) {
      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play();
        barraVolume.disabled = false;
        timeSong.innerHTML = formatDuration(album[i].duration);
        pause.classList.add("d-none");
      }
    } else {
      audio.src = previewUrl;
      audio.play();
      currentAudio = previewUrl;
      currentIndex = index; // Aggiorna currentIndex
      barraVolume.disabled = false;
      timeSong.innerHTML = formatDuration(album[i].duration);
      start.classList.add("d-none");
      pause.classList.remove("d-none");
    }
  }
  //Funzione per il tasto play
  function playSong2(previewUrl) {
    if (!audio.paused) {
      audio.pause();
      barraVolume.disabled = false;
    }
  }
  //Funzione per l'immagine nella playbar
  function imgSong(imgSong) {
    if (currentImg === imgSong) {
      imgPlayer.src.remove();
      logo.classList.add("d-none");
    } else {
      imgPlayer.src = imgSong;
      player.appendChild(imgPlayer);
      logo.classList.add("d-none");
    }
  }
  //Funzione per il titolo della canzone nella play
  function titleSong(titleSong) {
    if (currentTitlePlayer === titleSong) {
      titlePlayer.innerHTML = "";
    } else {
      titlePlayer.innerHTML = titleSong;
    }
  }
  //Funzione per il nome dell'artista nella play
  function artista(artista) {
    if (currentArtistPlayer === artista) {
      artistPlayer.innerHTML = "";
    } else {
      artistPlayer.innerHTML = artista;
    }
  }

  function noVol() {
    if (!audio.paused) {
      volume.classList.add("d-none");
      noVolume.classList.remove("d-none");
      audio.muted = true;
      barraVolume.max = "";
      barraVolume.disabled = true;
    }
  }
  function vol() {
    if (!audio.paused) {
      volume.classList.remove("d-none");
      noVolume.classList.add("d-none");
      audio.muted = false;
      barraVolume.disabled = false;
      barraVolume.max = "10";
    }
  }

  function nextSong() {
    if (currentIndex < album.length - 1) {
      currentIndex++; // Va alla traccia successiva
    } else {
      currentIndex = 0;
    }

    currentAudio = album[currentIndex].preview;
    playSong(currentAudio, currentIndex);
    imgSong(album[currentIndex].album.cover_small);
    titleSong(album[currentIndex].title);
    artista(album[currentIndex].artist.name);

    let newAudio = album[currentIndex].preview;
    audio.src = newAudio;
    audio.play();

    start.classList.add("d-none");
    pause.classList.remove("d-none");
  }

  console.log(currentAudio);

  function backSong() {
    if (currentIndex < album.length - 1) {
      currentIndex--;
    } else {
      currentIndex = album.length;
    }

    currentAudio = album[currentIndex].preview;
    playSong(currentAudio, currentIndex);
    imgSong(album[currentIndex].album.cover_small);
    titleSong(album[currentIndex].title);
    artista(album[currentIndex].artist.name);

    audio.src = currentAudio;
    audio.play();
    start.classList.add("d-none");
    pause.classList.remove("d-none");
  }

  //Evento che chiama la funzione per far partire le canzoni
  songTitle.addEventListener("click", () => {
    currentIndex = i;
    console.log(currentIndex);
    playSong(album[i].preview, currentIndex);
    imgSong(imgCanz);
    like.classList.remove("d-none");
    titleSong(titolo);
    artista(nomeArtista);
    pause.classList.remove("d-none");
  });

  //Eventi della playbar

  start.addEventListener("click", () => {
    if (album.length > 0) {
      //parte dalla prima
      playSong(album[0].preview);
      imgSong(album[0].album.cover_small);
      like.classList.remove("d-none");
      titleSong(album[0].title);
      artista(album[0].artist.name);
      pause.classList.remove("d-none");
      start.classList.add("d-none");
    }
  });
  pause.addEventListener("click", () => {
    playSong2(preview);
    start.classList.remove("d-none");
    pause.classList.add("d-none");
  });
  volume.addEventListener("click", () => {
    noVol();
  });
  noVolume.addEventListener("click", () => {
    vol();
  });
  next.addEventListener("click", () => {
    nextSong();

    //console.log(currentAudio);
  });

  back.addEventListener("click", () => {
    backSong();
  }); */
