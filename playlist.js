// Funtion para generar tabla de canciones seleccionadas
function generarTablaCancionesSeleccionadas () {
    const cancionesSeleccionadas = JSON.parse(localStorage.getItem("cancionesSeleccionadas")) || [];
    const tablaCancionesSeleccionadas = document.getElementById("tablaPlaylist");

    // Limpiar contenido actual de tabla
    tablaCancionesSeleccionadas.innerHTML = "";

    // Generar filas para cada canción
    cancionesSeleccionadas.slice(0, 10).forEach((cancion, index) => {
        const fila =document.createElement("tr");

        const columnaTop = document.createElement("td");
        columnaTop.textContent = index + 1;
        fila.appendChild(columnaTop);
        
        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = cancion.nombre;
        fila.appendChild(columnaNombre);
        
        const columnaArtista = document.createElement("td");
        columnaArtista.textContent = cancion.artista;
        fila.appendChild(columnaArtista);

        tablaCancionesSeleccionadas.appendChild(fila);
    });
}

generarTablaCancionesSeleccionadas();

