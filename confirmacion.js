function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || 'No disponible';
}

window.onload = function() {
    // Simula los datos recibidos desde la URL
    const datos = {
        nombre: getQueryParam('nombre'),
        parentesco: getQueryParam('parentesco'),
        numeroInvitados: getQueryParam('numeroInvitados'),
        telefono: getQueryParam('telefono'),
        chozo: getQueryParam('chozo'),
        cancion: getQueryParam('cancion'),
    };

    // Asigna los valores a los elementos del HTML
    document.getElementById('nombre').textContent = datos.nombre;
    document.getElementById('parentesco').textContent = datos.parentesco;
    document.getElementById('numeroInvitados').textContent = datos.numeroInvitados;
    document.getElementById('telefono').textContent = datos.telefono;
    document.getElementById('chozo').textContent = datos.chozo;
    document.getElementById('cancion').textContent = datos.cancion;
};


    // Dibujar la imagen de fondo y los datos en el canvas
    const canvas = document.getElementById('boarding-pass-canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = 'boarding pass.png'; // Ruta de la imagen subida

    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Configuración de texto
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';

        // Dibuja los datos en el boarding pass
        ctx.fillText(`Nombre: ${datos.nombre}`, 140, 120);
        ctx.fillText(`Parentesco: ${datos.parentesco}`, 140, 160);
        ctx.fillText(`Nº de invitados: ${datos.numeroInvitados}`, 140, 200);
        ctx.fillText(`Teléfono: ${datos.telefono}`, 140, 240);
        ctx.fillText(`Chozo: ${datos.chozo}`, 500, 200);
        ctx.fillText(`Canción: ${datos.cancion}`, 500, 240);
        ctx.fillText(`Mensaje: ${datos.mensaje}`, 140, 280);

        // Muestra el canvas
        canvas.style.display = 'block';
    }
;
