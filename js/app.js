const container = document.querySelector(".container");

const showCoffees = () => {
  let output = "";
  fetch('https://dev-coffee-server.herokuapp.com/api/coffee')
    .then((response) => response.json())
    .then((coffees) => {
      coffees.forEach(
        ({ name, image }) =>
        (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" href="#">Taste</a>
                </div>
                `)
      );
      container.innerHTML = output;
    })
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(() => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });

}
