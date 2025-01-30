const pop = document.querySelector(".popSearch");
const rock = document.querySelector(".rockSearch");
const blues = document.querySelector(".bluesSearch");
const metal = document.querySelector(".metalSearch");
const elettronica = document.querySelector(".elettronicaSearch");
const rap = document.querySelector(".rapSearch");

pop.style.backgroundColor = "pink";
rock.style.backgroundColor = "red";
blues.style.backgroundColor = "blue";
metal.style.backgroundColor = "black";
elettronica.style.backgroundColor = "orange";
rap.style.backgroundColor = "green";

const generi = [pop, rock, blues, metal, elettronica, rap];

generi.forEach((genere) => {
  genere.onclick = () => {
    window.location.assign("./search.html?query=" + genere.innerText.toLowerCase());
  };
});

const searchForm = document.querySelector("form");
searchForm.onsubmit = (e) => {
  e.preventDefault();
  const searchInput = document.querySelector(".searchInput").value;
  window.location.assign("./search.html?query=" + searchInput);
};

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.data; // Assumendo che i risultati siano in data.data
        console.log(searchResults);

        // Seleziona l'elemento <main> e svuota il suo contenuto
        const main = document.querySelector("main");
        const searchRow = document.querySelector(".searchRow");
        searchRow.innerHTML = "";

        // Crea un nuovo elemento <div> con la classe "row"
        const row = document.createElement("div");
        row.classList.add("row");
        main.appendChild(row);

        if (searchResults.length === 0) {
          // Mostra il modale se non ci sono risultati
          const noResultsModal = new bootstrap.Modal(document.getElementById("noResults"));
          noResultsModal.show();
        } else {
          // Se ci sono risultati, mostra le informazioni
          searchResults.forEach((result) => {
            const col = document.createElement("div");
            col.classList.add("col-md-4"); // Aggiunge una colonna con larghezza 4 su dispositivi medi
            console.log(result.artist.picture);
            const card = document.createElement("div");
            card.classList.add("card", "mb-4");
            const picture = document.createElement("img");
            picture.src = `${result.artist.picture_medium}`;
            picture.classList.add("img-fluid");
            picture.crossOrigin = "Anonymous";
            const colorThief = new ColorThief();
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "d-flex", "flex-column");

            const title = document.createElement("h5");
            title.classList.add("card-title", "text-light");
            title.textContent = result.title; // Supponendo che 'result' abbia una proprietà 'title'

            const artist = document.createElement("a");
            artist.classList.add("card-text", "text-decoration-none", "text-light");
            artist.textContent = "Artista: " + result.artist.name; // Supponendo che 'result' abbia una struttura con 'artist.name'
            artist.href = "./artist.html?artistId=" + result.artist.id;

            // Aggiungi gli elementi al DOM
            cardBody.appendChild(title);
            cardBody.appendChild(artist);
            cardBody.appendChild(picture);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);

            picture.onload = () => {
              const dominantColor = colorThief.getColor(picture); // Passa l'elemento immagine, non l'URL
              console.log(dominantColor);
              const darkColor = dominantColor.map((c) => Math.max(c - 50, 0)); // Riduce la luminosità di 50

              // Crea un gradiente che va dal colore dominante al colore più scuro
              const gradient = `linear-gradient(to bottom, rgb(${dominantColor.join(",")}), rgb(${darkColor.join(
                ","
              )}))`;

              // Imposta il gradiente come sfondo
              card.style.background = gradient;
            };
          });
        }
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  }
});

const closeModalBtn = document.getElementById("closeModalBtn");

// Aggiungi un event listener per il click sul bottone di chiusura
closeModalBtn.addEventListener("click", function () {
  // Rimuovi la query string e fai il redirect alla pagina /search
  window.location.href = "/search.html";
});
