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
