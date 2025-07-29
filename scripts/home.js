// Simular nombre del usuario
const nombreUsuario = "Jerónimo";
document.getElementById("nombre-usuario").textContent = nombreUsuario;

// Frases motivacionales semanales
const frases = [
  "Hoy es un buen día para aprender algo nuevo.",
  "Cada pequeño esfuerzo cuenta.",
  "El futuro pertenece a quienes se preparan hoy.",
  "Nunca dejes de intentarlo.",
  "El conocimiento es tu mejor herramienta.",
  "Aprende como si fueras a vivir para siempre.",
  "Los errores son parte del aprendizaje.",
  "Tu esfuerzo de hoy es tu éxito de mañana.",
  "Cree en ti. Puedes lograrlo.",
  "Estás más cerca de tu meta de lo que crees."
];

// Calcular semana del año
function obtenerSemanaActual() {
  const hoy = new Date();
  const primerDiaAño = new Date(hoy.getFullYear(), 0, 1);
  const diferencia = hoy - primerDiaAño;
  const unDia = 1000 * 60 * 60 * 24;
  return Math.floor(diferencia / unDia / 7);
}

// Mostrar frase semanal
const semana = obtenerSemanaActual();
const frase = frases[semana % frases.length];
document.getElementById("frase-semanal").textContent = `"${frase}"`;

// Menú desplegable con el logo
const logo = document.getElementById('logo');
const menu = document.getElementById('menu');

logo.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!document.querySelector('.logo-menu-container').contains(e.target)) {
    menu.style.display = 'none';
  }
});

function cerrarSesion() {
  alert("Cerrando sesión...");
  // window.location.href = "login.html"; // redirección real si quieres
}

