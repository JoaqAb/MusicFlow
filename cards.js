async function cargarJSON() {
  try {
    const response = await fetch("./Resources/jamendo.json");
    const data = await response.json();

    const nuevaData = nuevoArray(data);

    nuevaData.forEach((item, index) => {
      const card = document.getElementById(`card${index + 1}`);
      const image = card.querySelector(".card-img");
      const title = card.querySelector(".card-title");
      const artist = card.querySelector(".card-artist");
      image.src = item.image;
      title.textContent = item.nombre;
      artist.textContent = item.artista;
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

function nuevoArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("load", cargarJSON);
