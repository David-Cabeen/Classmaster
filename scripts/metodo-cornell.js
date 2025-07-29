function finalizar(button) {
    const panel = button.closest('.panel');
    const content = panel.querySelector('.contenido');
    content.removeAttribute('contenteditable');
    content.classList.add('bloqueado');
    window.getSelection()?.removeAllRanges();
    document.activeElement.blur();
  }


  function finalizar(button) {
    const panel = button.closest('.panel');
    const content = panel.querySelector('.contenido');
    content.removeAttribute('contenteditable');
    content.classList.add('bloqueado');
    window.getSelection()?.removeAllRanges();
    document.activeElement.blur();

    verificarFinalizados();
  }

 
  
  document.querySelectorAll('.contenido').forEach(area => {
    area.addEventListener('input', () => {
      if (area.textContent.trim() === '') {
        area.innerHTML = '';
      }
    });
  });