// Var & const
const registroNombre = document.getElementById("registroNombre");
const registroEmail = document.getElementById("registroEmail");
const registroPass = document.getElementById("registroPass");
const registroForm = document.getElementById("registroForm");
const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const mensajeModal = document.getElementById("mensajeModal");
const admin = {
  email: "admin@admin.com",
  pass: "admin",
};


// Autofocus en los campos de correo electrónico
const modalLogin = document.getElementById("modallogin");
modalLogin.addEventListener("shown.bs.modal", function () {
  document.getElementById("loginEmail").focus();
});

const modalReg = document.getElementById("modalReg");
modalReg.addEventListener("shown.bs.modal", function () {
  document.getElementById("registroNombre").focus();
});

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

// Campos vacios
function camposVacios(email, pass) {
  return email.trim() === "" || pass.trim() === "";
}

// Guardar datos de registro
function guardarRegistro(event) {
  event.preventDefault();

  // Valores del formulario de registro
  const registroNombreValue = registroNombre.value;
  const registroEmailValue = registroEmail.value;
  const registroPassValue = registroPass.value;

  // Lista actual de usuarios
  const usuarios = obtenerUsuarios();

  // Crear nuevo usuario con los datos ingresados
  const nuevoUsuario = { nombre: registroNombreValue, email: registroEmailValue, pass: registroPassValue };

  // Agregar nuevo usuario a la lista
  usuarios.push(nuevoUsuario);

  // Guardar lista actualizada
  guardarUsuarios(usuarios);

  // Mostrar mensaje de registro exitoso
  alert("Registro exitoso, Ahora puedes iniciar sesión.");

  // Limpiar formulario
  registroForm.reset();
}

// Verificar si el usuario está registrado y la contraseña es válida
function usuarioRegistrado(email, pass) {
  const usuarios = obtenerUsuarios();
  return usuarios.some(
    (usuario) => usuario.email === email && usuario.pass === pass
  );
}

// Verificar credenciales
function iniciarSesion(event) {
  event.preventDefault();

  // Obtener valores del formulario
  const loginEmailValue = loginEmail.value;
  const loginPassValue = loginPass.value;

  // Validar campos vacios
  if (camposVacios(loginEmailValue, loginPassValue)) {
    mensajeModal.innerText = "Por favor completa todos los campos.";
    return;
  }

  // Verificar si es admin
  if (loginEmailValue === admin.email && loginPassValue === admin.pass) {
    window.location.href = "admin.html";
    return;
  }

  // Verificar si el usuario está registrado y la contraseña es válida
  if (usuarioRegistrado(loginEmailValue, loginPassValue)) {
    mensajeModal.innerText = "Bienvenido";
    window.location.href = "usuarios.html";
  } else {
    mensajeModal.innerText =
      "Usuario no registrado o contraseña incorrecta. Intenta nuevamente o regístrate.";
  }
}

// Eventos

// Evento para formulario de registro
registroForm.addEventListener("submit", guardarRegistro);

// Evento para inicio de sesión
const loginForm = document.getElementById("modallogin").querySelector("form");
loginForm.addEventListener("submit", iniciarSesion);

// Flujo principal
