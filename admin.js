// Var & const
const buscador = document.getElementById("buscadorCanciones");

// Funciones

// Obtener usuarios almacenados en LocalStorage
function obtenerUsuarios() {
  const usuariosJSON = localStorage.getItem("usuarios");
  return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

// Guardar lista en LocalStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Generar filas para la tabla con los usuarios registrados
function generarTablaUsuarios() {
  const usuarios = obtenerUsuarios();
  const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");

  // Limpiar contenido actual de la tabla
  tablaUsuarios.innerHTML = "";

  // Generar filas para cada usuario
  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");

    // Columna Nombre
    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = usuario.nombre;
    fila.appendChild(columnaNombre);

    // Columna Email
    const columnaEmail = document.createElement("td");
    columnaEmail.textContent = usuario.email;
    fila.appendChild(columnaEmail);

    // Columna Acciones
    const columnaAcciones = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-sm", "bg-black");
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
    botonEliminar.addEventListener("click", () => {
      eliminarUsuario(usuario);
    });
    columnaAcciones.appendChild(botonEliminar);
    fila.appendChild(columnaAcciones);

    // Agregar fila a la tabla
    tablaUsuarios.appendChild(fila);
  });
}
// Eliminar usuario de la lista y actualizar tabla
function eliminarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const usuariosActualizados = usuarios.filter(
    (u) => u.email !== usuario.email
  );
  guardarUsuarios(usuariosActualizados);
  generarTablaUsuarios();
}

// Cargar canciones desde JSON
async function cargarCanciones() {
  try {
    const response = await fetch("./resources/canciones.json");
    const data = await response.json();

    // Menu desplegable y tabla
    const menuDesplegable = document.getElementById("canciones");
    const tablaCanciones = document.querySelector("#tablaCanciones tbody");

    // Limpiar menu desplegable
    menuDesplegable.innerHTML = "";
    menuDesplegable.appendChild(document.createElement("option"));

    // Agregar canciones al menu
    data.forEach((cancion) => {
      const option = document.createElement("option");
      option.value = cancion.id;
      option.textContent = `${cancion.artista} - ${cancion.nombre}`;
      menuDesplegable.appendChild(option);
    });

    // Limpiar tabla
    tablaCanciones.innerHTML = "";

    // Agregar filas a la tabla
    data.forEach((cancion) => {
      const fila = document.createElement("tr");
      const columnaID = document.createElement("td");
      const columnaArtista = document.createElement("td");
      const columnaNombre = document.createElement("td");
      const columnaAcciones = document.createElement("td");

      columnaID.textContent = cancion.id;
      columnaArtista.textContent = cancion.artista;
      columnaNombre.textContent = cancion.nombre;
      
      // Boton para agregar las canciones
      const botonAgregar = document.createElement("button");
      botonAgregar.classList.add("btn", "btn-sm", "bg-black", "btn-agregar");
      botonAgregar.innerHTML = "Agregar";
      columnaAcciones.appendChild(botonAgregar);

      fila.appendChild(columnaID);
      fila.appendChild(columnaArtista);
      fila.appendChild(columnaNombre);
      fila.appendChild(columnaAcciones);
      tablaCanciones.appendChild(fila);
    });

    // Altura maxima del body
    const tbodyCanciones = document.querySelector("#bodyCanciones");
    tbodyCanciones.style.maxHeight = "300px";
    tbodyCanciones.style.overflowY = "auto";
  } catch (error) {
    console.error("Error al cargar archivo JSON:", error);
  }
}

// Agregar evento de entrada del buscador
buscador.addEventListener("input", () => {
  // Obtener termino ingresado
  const terminoBusqueda = buscador.value.trim().toLowerCase();

  // Obtener filas de la tabla de canciones
  const filas = document.querySelectorAll("#tablaCanciones tbody tr");

  // Recorrer las filas y mostrar las que coincidan
  filas.forEach((fila) => {
    const nombreCancion = fila
      .querySelector("td:nth-child(3)")
      .textContent.toLowerCase();
    const artistaCancion = fila
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();

    if (
      nombreCancion.includes(terminoBusqueda) ||
      artistaCancion.includes(terminoBusqueda)
    ) {
      fila.style.display = "table-row";
    } else {
      fila.style.display = "none";
    }
  });
});

// Obtener tabla de canciones disponibles
const tablaCanciones = document.getElementById("tablaCanciones");
const bodyCanciones = document.getElementById("bodyCanciones");

// Obtener tabla de canciones seleccionadas
const tablaSeleccion = document.getElementById("tablaSeleccion");
const bodySeleccion = document.getElementById("bodySeleccion");

// Agregar evento de escucha a canciones disponibles
tablaCanciones.addEventListener("click", (event) => {
  // Verificar click en boton agregar
  if (event.target.classList.contains("btn-agregar")) {
    // Obtener fila a agregar
    const fila = event.target.closest("tr");

    // Obtener los datos de la cancion desde la fila
    const id = fila.querySelector("td:nth-child(1)").textContent;
    const nombre = fila.querySelector("td:nth-child(2)").textContent;
    const artista = fila.querySelector("td:nth-child(3)").textContent;

    // Crear objeto con datos de la canción
    const nuevaCancion = {
      id: id,
      nombre: nombre,
      artista: artista,
    };

    // Agregar nueva canción a array "cancionesSeleccionadas"
    const cancionesSeleccionadas =
      JSON.parse(localStorage.getItem("cancionesSeleccionadas")) || [];
    cancionesSeleccionadas.push(nuevaCancion);
    localStorage.setItem(
      "cancionesSeleccionadas",
      JSON.stringify(cancionesSeleccionadas)
    );

    // Mostrar la canción agregada a la tabla de canciones seleccionadas
    generarTablaCancionesSeleccionadas();

    // Mostrar toast de éxito
    // To do
  }
});

// Function para generar tabla de canciones seleccionadas
function generarTablaCancionesSeleccionadas() {
  const cancionesSeleccionadas = JSON.parse(localStorage.getItem("cancionesSeleccionadas")) || [];

  // Limpiar contenido de tabla de canciones seleccionadas
  bodySeleccion.innerHTML = "";

  // Generar filas para cada canción seleccionada
  cancionesSeleccionadas.forEach((cancion) => {
    // Verificar si la canción ya está en la tabla
    const cancionEnTabla = bodySeleccion.querySelector(`tr[data-id="${cancion.id}"]`);

    if (!cancionEnTabla) {
      const fila = document.createElement("tr");
      fila.setAttribute("data-id", cancion.id);

      const columnaID = document.createElement("td");
      columnaID.textContent = cancion.id;
      fila.appendChild(columnaID);
      
      const columnaNombre = document.createElement("td");
      columnaNombre.textContent = cancion.nombre;
      fila.appendChild(columnaNombre);
      
      const columnaArtista = document.createElement("td");
      columnaArtista.textContent = cancion.artista;
      fila.appendChild(columnaArtista);

      const columnaAcciones = document.createElement("td");
      const botonEliminar = document.createElement("button");
      botonEliminar.classList.add("btn", "btn-sm", "bg-black");
      botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
      botonEliminar.addEventListener("click", () => {
        eliminarCancionSeleccionada(cancion);
      });

      columnaAcciones.appendChild(botonEliminar);
      fila.appendChild(columnaAcciones);

      // Agregar fila a la tabla de canciones seleccionadas
      bodySeleccion.appendChild(fila);
    }
  });
}


// Function para eliminar una canción
function eliminarCancionSeleccionada(cancion) {
  const cancionesSeleccionadas = JSON.parse(localStorage.getItem("cancionesSeleccionadas")) || [];
  const cancionesActualizadas = cancionesSeleccionadas.filter((c) => c.id !== cancion.id);
  localStorage.setItem("cancionesSeleccionadas", JSON.stringify(cancionesActualizadas));
  generarTablaCancionesSeleccionadas();
}

// LLamar a function para generar la tabla de canciones seleccionadas al cargar la pagina
generarTablaCancionesSeleccionadas();

// Evento para cargar tabla de usuarios
document.addEventListener("DOMContentLoaded", () => {
  generarTablaUsuarios(), cargarCanciones();
});
