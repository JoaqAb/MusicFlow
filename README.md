# MusicFlow
Proyecto 2 - Grupo 2 - C55i - RC

Proyecto: Streaming de música

ALCANCE DEL PROYECTO
En este proyecto los alumnos en forma grupal se dividirán las tareas necesarias para diseñar un sitio que
permita administrar canciones.
El alcance de este proyecto se centra en cómo realizar todos los pasos del CRUD y mostrará los datos en
forma de un catálogo de música, también deberá realizarse el login del proyecto, se considera que solo el
usuario administrador podrá administrar las canciones, mientras que los usuarios visitantes solo podrán
ver y escuchar las canciones publicadas. Además hay requerimientos optativos como el registro de
usuarios y poder armar una lista de reproducción diseñada por un usuario.

REQUERIMIENTOS

ESTRUCTURA GENERAL DEL SITIO:
El diseño del sitio será decidido por cada grupo, pero deberá ser completamente responsive.
Consideramos que al menos deben desarrollar la siguientes páginas:
● Página Principal: Esta página mostrará el catálogo de canciones previamente cargadas desde la
página de administración. Además debe contener un filtro que nos permita buscar una canción ya
sea por su nombre o grupo/cantante.
● Página de administración: En la página de administración se debe mostrar una tabla con las
canciones cargadas, además de las opciones necesarias para agregar agregar, borrar y editar las
mismas. (solo los usuarios administradores deben poder ver esta página)
● Página de detalle: al seleccionar una canción, veremos una página con más detalles de la canción:
○ Código único.
○ Título
○ Artista o grupo
○ Categoría
○ Imagen (álbum o alguna imagen decorativa de la canción) cargada con url
○ duración de la canción
○ canción
○ NOTA: Pueden agregar más propiedades si lo consideran necesario.
● Página acerca de nosotros: Esta página contendrá información del equipo que desarrolló esta
web, alguna frase que hable del equipo y debajo una galería donde se visualice una foto o avatar
de cada miembro del equipo, seguido por el nombre de cada uno.
● Página error 404: Diseñar una web con el error 404, esta página deberá ser llamada desde todos
los botones o link de nuestro sitio que no tengan una funcionalidad establecida.
● Login: diseñar una página o ventana modal desde donde un usuario administrador deberá poder
ingresar sesión. (Este mismo login servirá para usuarios registrados en caso de realizar el
requerimiento optativo)
REQUERIMIENTOS OPTATIVOS
Agregar las siguientes páginas o funcionalidades a nuestro sitio:

REGISTRO
Página de registro o ventana modal, donde se solicitarán por lo menos los siguientes campos: Nombre,
correo electrónico (el cual servirá para ingresar al sitio) y contraseña. Pueden agregar más campos si lo
consideran necesarios. Si se desarrolla el registro, también se debe agregar en la página de administración
una tabla donde se pueda ver los usuarios registrados en el sitio y un botón para eliminar un usuario.
Nota: Tener en cuenta que este sitio contará con dos perfiles de usuario, un usuario será el administrador
y ya puede estar cargado en el sistema, el resto de los usuarios registrados usando la página o formulario
de registro serán considerados usuarios invitados.

LISTA DE REPRODUCCIÓN
Una vez que nos logueamos en la web como un usuario invitado, podemos seleccionar las canciones que
nos gusten e ir armando una lista de reproducción propia de cada usuario, esta lista debe ser visible en
cualquier momento por el usuario, el cual además podría eliminar una canción de su lista.

EVALUACIÓN:
En este proyecto se evaluará el uso de las siguientes herramientas y conceptos:
▪ Panel de trello grupal (elegir un scrum master por equipo y seleccionar un nombre de equipo).
▪ Sitio completamente responsive.
▪ Estructura del proyecto y código limpio.
▪ Conceptos de JavaScript, validación de formularios con html y Javascript, uso de localstorage, objetos,
clases etc.
▪ Archivo readme con la descripción del proyecto.
▪ Uso de Github para trabajar en forma colaborativa con el grupo.
▪ Subir el sitio a un servidor ej: netlify o githubPages
