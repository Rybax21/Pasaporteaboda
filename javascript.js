document.addEventListener("DOMContentLoaded", () => {
  // === CUENTA ATRÁS ===
  function iniciarCuentaAtras() {
    const fechaBoda = new Date("2025-10-18T00:00:00").getTime();
    const temporizador = setInterval(function () {
      const ahora = new Date().getTime();
      const diferencia = fechaBoda - ahora;

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      document.getElementById("dias").textContent = dias;
      document.getElementById("horas").textContent = horas;
      document.getElementById("minutos").textContent = minutos;
      document.getElementById("segundos").textContent = segundos;

      if (diferencia < 0) {
        clearInterval(temporizador);
        document.querySelector(".cuenta").innerHTML =
          "<h2>¡Ya llegó el gran día!</h2>";
      }
    }, 1000);
  }

  iniciarCuentaAtras();

  // === EFECTO POLAROID Y SONIDO ===
  const fotoClick = document.getElementById("polaroidFoto");
  const fotoReal = document.getElementById("fotoReal");
  const texto = document.querySelector(".texto-polaroid");

if (fotoClick) {
  fotoClick.addEventListener('click', () => {
    fotoReal.src = 'Nosotros.jpg';
    fotoReal.style.opacity = '1';

    // Solo si existe el texto
    const texto = document.querySelector('.texto-polaroid');
    if (texto) texto.style.opacity = '1';

    const audio = new Audio('camera-click.mp3');
    audio.play().catch(e => console.log("No se pudo reproducir el audio: ", e));
  });
}

});
// === TRAZADO EN FORMA DE CORAZÓN CON ESTELA ===
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvasAvion");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const avion = new Image();
  avion.src = "avion1.png"; // Asegúrate que existe

  let angle = 0;
  let trail = [];

  function drawHeartPath(t) {
    const scale = 12;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2.2;

    const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
    const y =
      centerY -
      scale *
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t));

    return { x, y };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x, y } = drawHeartPath(angle);
    trail.push({ x, y });
    if (trail.length > 300) trail.shift();

    // Dibujar estela
    ctx.beginPath();
    for (let i = 0; i < trail.length - 1; i++) {
      const p1 = trail[i];
      const p2 = trail[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.strokeStyle = "rgba(255, 220, 100, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dibujar avión
    const next = drawHeartPath(angle + 0.01);
    const rad = Math.atan2(next.y - y, next.x - x);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad);
    ctx.drawImage(avion, -30, -15, 60, 30);
    ctx.restore();

    angle += 0.015;
    if (angle >= 2 * Math.PI) {
      angle = 0;
      trail = [];
    }

    requestAnimationFrame(draw);
  }

  avion.onload = () => {
    draw();
  };
});
document
  .querySelector(".formulario-asistencia")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Detiene el comportamiento predeterminado del envío del formulario

    // Recoge los datos del formulario
    const form = event.target; // El formulario actual
    const formData = new FormData(form); // Automáticamente mapea los inputs con sus atributos `name`

    // Envía los datos mediante fetch al script de Google
    fetch(
      "https://script.google.com/macros/s/AKfycby6-1g79utDY0H9-w9fLEWYE4mJ6x5-LRd-ufHNk6jA8TxawD0YAiAdFLTnJX7LEHKD/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json()) // Procesa la respuesta como JSON
      .then((data) => {
        if (data.status === "success") {
          // Redirige al usuario a la página de confirmación
          window.location.href = "http://127.0.0.1:3000/confirmacion.html";
        } else {
          alert(
            "Hubo un problema al enviar los datos. Por favor, inténtalo nuevamente."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error de conexión. Por favor, verifica tu conexión a Internet.");
      });
  });
