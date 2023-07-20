// Var & const

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
  const tablaUsuarios = document
  .querySelector("#tablaUsuarios tbody");


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
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>'; // Agregar el icono "x" usando la clase de Bootstrap
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
    const tablaCanciones = document
  .querySelector("#tablaCanciones tbody");


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
    data.slice(0, 5).forEach((cancion) => {
      const fila = document.createElement("tr");
      const columnaID = document.createElement("td");
      const columnaArtista = document.createElement("td");
      const columnaNombre = document.createElement("td");
      const columnaAcciones = document.createElement("td");

      columnaID.textContent = cancion.id;
      columnaArtista.textContent = cancion.artista;
      columnaNombre.textContent = cancion.nombre;
      columnaAcciones.textContent = cancion.nombre;

      fila.appendChild(columnaID);
      fila.appendChild(columnaArtista);
      fila.appendChild(columnaNombre);
      fila.appendChild(columnaAcciones);
      tablaCanciones.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar archivo JSON:", error);
  }
}

// Eventos

// Evento para cargar tabla de usuarios
document.addEventListener("DOMContentLoaded", () => {
  generarTablaUsuarios(), cargarCanciones();
});


