document.addEventListener('DOMContentLoaded', function () {
  const inputImagen = document.getElementById('img');
  const formularioImagen = document.getElementById('img-form');
  const archivoImagen = document.getElementById('img-file');
  const inputAncho = document.getElementById('width');
  const inputAlto = document.getElementById('height');
  const spanNombreArchivo = document.getElementById('filename');

  inputImagen.addEventListener('change', function (evento) {
      const archivo = evento.target.files[0];
      if (archivo) {
          spanNombreArchivo.textContent = archivo.name;
          formularioImagen.classList.remove('hidden');
          archivoImagen.classList.remove('hidden');

          const imagen = new Image();
          imagen.src = URL.createObjectURL(archivo)
          imagen.onload = function () {
              inputAncho.value = this.width
              inputAlto.value = this.height
              console.log('Éxito');
          }
      }
  });
});

function redimensionarImagen() {
  const input = document.getElementById('img');
  const archivo = input.files[0];

  const inputAncho = document.getElementById('width');
  const inputAlto = document.getElementById('height');
  
  if (archivo) {
      const lector = new FileReader();

      lector.onload = function (evento) {
          const img = new Image();
          img.src = evento.target.result;

          img.onload = function () {
              const canvas = document.createElement('canvas');
              const contexto = canvas.getContext('2d');
              canvas.width = parseInt(inputAncho.value);
              canvas.height = parseInt(inputAlto.value);

              contexto.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Guardar la imagen redimensionada
              const dataURLRedimensionado = canvas.toDataURL('image/jpeg');
              
              console.log(dataURLRedimensionado);

              // Crear un enlace para descargar la imagen redimensionada
              const enlaceDescarga = document.createElement('a');
              enlaceDescarga.href = dataURLRedimensionado;
              enlaceDescarga.download = 'imagen_redimensionada.jpg';
              enlaceDescarga.click();
          };
      };

      lector.readAsDataURL(archivo);
  } else {
      alert('Por favor, selecciona una imagen.');
  }
}
