function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || 'No disponible';
}

window.onload = function() {
    // Simula datos recibidos desde la URL
    const datos = {
        nombre: getQueryParam('nombre'),
        parentesco: getQueryParam('parentesco'),
        numeroInvitados: getQueryParam('numeroInvitados'),
        telefono: getQueryParam('telefono'),
        chozo: getQueryParam('chozo'),
        cancion: getQueryParam('cancion'),
        mensaje: getQueryParam('mensaje')
    };

    // Asigna los valores a los elementos del HTML
    document.getElementById('nombre').textContent = datos.nombre;
    document.getElementById('parentesco').textContent = datos.parentesco;
    document.getElementById('numeroInvitados').textContent = datos.numeroInvitados;
    document.getElementById('telefono').textContent = datos.telefono;
    document.getElementById('chozo').textContent = datos.chozo;
    document.getElementById('cancion').textContent = datos.cancion;
    document.getElementById('mensaje').textContent = datos.mensaje;
};