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
for (i = 0; i < 6; i++) {
  const mainRow = document.getElementById("mainRow");

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

  const img1 = document.createElement("img");
  img1.classList.add("img-fluid", "w-50", "p-0");
  img1.alt = `img1 alt`;
  img1.src = "./assets/imgs/main/image-10.jpg";
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
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-nowrap", "text-white");
  cardTitle.innerText = "card title";

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
}
