console.log("Ready!")
// Cargar el archivo JSON
// fetch('vEscucharlos.json')
fetch('./Resources/canciones.json')
  .then(response => response.json())
  .then(data => {
    const songs = data;

    function searchSongs(event) {
        event.preventDefault();
        const query = document.getElementById('searchInput').value.toLowerCase();
// limpiar los resultados de la busqueda anterior
        document.getElementById('searchInput').value = '';        

      const filteredSongs = songs.filter(song => {
        // Verificar si las propiedades existen en el objeto antes de buscar
        // const titulo = song.titulo ? song.titulo.toLowerCase() : '';
        const nombre = song.nombre ? song.nombre.toLowerCase() : '';
        const artista = song.artista ? song.artista.toLowerCase() : '';

        return nombre.includes(query) || artista.includes(query);
      });

      if (filteredSongs.length === 0) {
        Swal.fire({
            icon: 'warning',
            text: 'No se encontraron coincidencias.',
          })

      } else {
        let resultMessage = 'Coincidencias:\n';
        filteredSongs.forEach(song => {
          // resultMessage += `\nTítulo: ${song.titulo}\nArtista: ${song.artista}\n Pista: ${song.trackNumber}\n Album: ${song.album}\n~`;
          resultMessage += `\nTítulo: ${song.nombre}\nArtista: ${song.artista}\n~`;
        });
        Swal.fire(resultMessage)
      }
    }

    // Buscar canciones cuando se hace clic en el botón
    document.getElementById('searchButton').addEventListener('click', searchSongs);

    // También se puede buscar canciones al presionar Enter en el input
    document.getElementById('searchInput').addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        searchSongs();
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });