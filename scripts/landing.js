// Mensajes que cambian automáticamente
const messages = [
    "Nuestra visión es transformar la educación con herramientas digitales intuitivas y efectivas.",
    "Nuestra misión es empoderar a los estudiantes mediante plataformas accesibles y dinámicas.",
    "Buscamos conectar conocimiento con innovación para un aprendizaje real y duradero."
  ];
  
  let index = 0;
  const textElement = document.getElementById("infoText");
  
  setInterval(() => {
    textElement.style.opacity = 0;
  
    setTimeout(() => {
      index = (index + 1) % messages.length;
      textElement.textContent = messages[index];
      textElement.style.opacity = 1;
    }, 1000);
  }, 12000); // Cambia cada 12 segundos
  