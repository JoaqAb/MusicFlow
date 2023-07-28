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
    botonPlay.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    columnaAcciones.appendChild(botonPlay);
    fila.appendChild(columnaAcciones);

    tablaCancionesSeleccionadas.appendChild(fila);
  });
}

// Function para reproducir audio
function reproducirAudio(url, titulo) {
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
  cancionActual.textContent = titulo;

  // Cargar la canción y luego reproducirla
  player.load();
  player.play();
}

// Agregar evento al botón play y al ícono de play
document.addEventListener("click", (event) => {
  // Verificar click en botón play o ícono de play
  if (
    event.target.classList.contains("btn-play") ||
    event.target.classList.contains("bi-play-circle-fill")
  ) {
    // Obtener ID de fila
    const fila = event.target.closest("tr");
    const idCancion = parseInt(fila.firstChild.textContent);

    // Lista de URL y títulos para reproducir
    const listaCanciones = [
      {
        url: "./Resources/music/Coolio - Gangstas Paradise (feat. L.V.).mp3",
        titulo: "Coolio - Gangsta's Paradise",
      },
      {
        url: "./Resources/music/The Beatles - Hey Jude.mp3",
        titulo: "The Beatles - Hey Jude",
      },
      {
        url: "./Resources/music/Pink Floyd - Another Brick In The Wall, Part Two.mp3",
        titulo: "Pink Floyd - Another Brick In The Wall, Part Two",
      },
      {
        url: "./Resources/music/The Rolling Stones - (I Can't Get No) Satisfaction.mp3",
        titulo: "The Rolling Stones - (I Can't Get No) Satisfaction",
      },
      {
        url: "./Resources/music/Eminem - Lose Yourself.mp3",
        titulo: "Eminem - Lose Yourself",
      },
      {
        url: "./Resources/music/The Beatles - Let It Be.mp3",
        titulo: "The Beatles - Let It Be",
      },
      {
        url: "./Resources/music/Bee Gees - Stayin' Alive.mp3",
        titulo: "Bee Gees - Stayin' Alive",
      },
      {
        url: "./Resources/music/The Police - Every Breath You Take.mp3",
        titulo: "The Police - Every Breath You Take",
      },
      {
        url: "./Resources/music/George Harrison - My Sweet Lord.mp3",
        titulo: "George Harrison - My Sweet Lord",
      },
      {
        url: "./Resources/music/Michael Jackson - Billie Jean.mp3",
        titulo: "Michael Jackson - Billie Jean",
      },
    ];

    // Verificar ID y reproducir
    if (idCancion >= 1 && idCancion <= listaCanciones.length) {
      const { url, titulo } = listaCanciones[idCancion - 1];
      reproducirAudio(url, titulo);
    }
  }
});

generarTablaCancionesSeleccionadas();
