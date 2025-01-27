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
