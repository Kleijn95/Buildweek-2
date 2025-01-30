document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Previene il comportamento predefinito del form
      const query = input.value.trim();
      if (query) {
        const apiUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?query=${encodeURIComponent(query)}`;
        window.location.href = apiUrl;
      } else {
        // Gestisci il caso in cui l'input è vuoto, se necessario
        alert("Per favore, inserisci una query di ricerca.");
      }
    });
  });

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
        main.innerHTML = "";

        // Crea un nuovo elemento <div> con la classe "row"
        const row = document.createElement("div");
        row.classList.add("row");
        main.appendChild(row);
        if (searchResults.length === 0) {
          // Se non ci sono risultati, mostra la modale
          const noResultsModal = new bootstrap.Modal(document.getElementById("noResultsModal"));
          noResultsModal.show();
        } else {
          // Crea un nuovo elemento <div> con la classe "row"
          const row = document.createElement("div");
          row.classList.add("row");
          main.appendChild(row);
        }
        // Itera su searchResults
        searchResults.forEach((result) => {
          // Qui puoi gestire ogni elemento 'result' come preferisci
          // Ad esempio, creare un nuovo elemento per visualizzare le informazioni del risultato
          const col = document.createElement("div");
          col.classList.add("col-md-4"); // Aggiunge una colonna con larghezza 4 su dispositivi medi

          const card = document.createElement("div");
          card.classList.add("card", "mb-4");

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = result.title; // Supponendo che 'result' abbia una proprietà 'title'

          const artist = document.createElement("p");
          artist.classList.add("card-text");
          artist.textContent = "Artista: " + result.artist.name; // Supponendo che 'result' abbia una struttura con 'artist.name'

          // Aggiungi gli elementi al DOM
          cardBody.appendChild(title);
          cardBody.appendChild(artist);
          card.appendChild(cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });
      })
      .catch((error) => {
        console.error("Errore nella richiesta API:", error);
      });
  }
});
