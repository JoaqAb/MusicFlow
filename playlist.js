// Función para obtener los datos del JSON
async function obtenerDatosDelJSON() {
  try {
    const response = await fetch("./Resources/jamendo.json");
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener los datos del JSON:", error);
    return [];
  }
}

// Funtion para generar tabla de canciones seleccionadas
function generarTablaCancionesSeleccionadas() {
  const cancionesSeleccionadas =
    JSON.parse(localStorage.getItem("cancionesSeleccionadas")) || [];
  const tablaCancionesSeleccionadas = document.getElementById("tablaPlaylist");

  // Limpiar contenido actual de tabla
  tablaCancionesSeleccionadas.innerHTML = "";

  // Generar filas para cada canción
  cancionesSeleccionadas.slice(0, 10).forEach((cancion, index) => {
    const fila = document.createElement("tr");

    const columnaTop = document.createElement("td");
    columnaTop.textContent = index + 1;
    fila.appendChild(columnaTop);

    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = cancion.nombre;
    fila.appendChild(columnaNombre);

    const columnaArtista = document.createElement("td");
    columnaArtista.textContent = cancion.artista;
    fila.appendChild(columnaArtista);

    const columnaAcciones = document.createElement("td");
    const botonPlay = document.createElement("button");
    botonPlay.classList.add("btn", "btn-lg", "bg-orange", "btn-play");
    botonPlay.setAttribute("data-id", cancion.id);
    botonPlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    columnaAcciones.appendChild(botonPlay);
    fila.appendChild(columnaAcciones);

    tablaCancionesSeleccionadas.appendChild(fila);
  });
}

// Function para reproducir audio
function reproducirAudio(url, nombre, artista) {
  const player = document.getElementById("player");
  const audioSource = document.getElementById("audioSource");
  const playerContainer = document.querySelector(".player-container");
  const cancionActual = document.getElementById("cancionActual");

  // Si ya hay una canción reproduciéndose, detenerla antes de reproducir la nueva
  if (!player.paused) {
    player.pause();
    player.currentTime = 0;
  }

  // Asignar la URL de la nueva canción al reproductor
  audioSource.src = url;
  playerContainer.style.display = "block"; // Mostrar el reproductor

  // Actualizar el título de la canción que está sonando
  cancionActual.textContent = nombre + " - " + artista;

  // Cargar la canción y luego reproducirla
  player.load();
  player.play();
}

// Agregar evento al botón play y al ícono de play
document.addEventListener("click", async (event) => {
  // Verificar click en botón play o ícono de play
  if (
    event.target.classList.contains("btn-play") ||
    event.target.classList.contains("bi-play-circle-fill")
  ) {
    // Obtener el ID de la canción seleccionada
    const fila = event.target.closest("tr");
    const idCancion = parseInt(
      fila.querySelector("[data-id]").getAttribute("data-id")
    );

    // Obtener datos del JSON
    const cancionesSeleccionadas = await obtenerDatosDelJSON();

    // Buscar la canción en el JSON
    const cancionSeleccionada = cancionesSeleccionadas.find(
      (cancion) => parseInt(cancion.id) === idCancion
    );

    // Verificar si se encontró la canción antes de reproducirla
    if (cancionSeleccionada) {
      const { audio, nombre, artista } = cancionSeleccionada;
      reproducirAudio(audio, nombre, artista);
    } else {
      console.error("No se encontró la canción en el JSON.");
    }
  }
});

// Inicializar Plyr después de que el documento se haya cargado
document.addEventListener("DOMContentLoaded", () => {
  generarTablaCancionesSeleccionadas();
  new Plyr("#player");
});
