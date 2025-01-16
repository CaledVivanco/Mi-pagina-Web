document.addEventListener('DOMContentLoaded', () => {
  // Configuración del slider
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider-item');
  const totalSlides = slides.length;
  const slider = document.querySelector('.slider');

  // Verificaciones iniciales
  if (slides.length === 0) {
    console.error("No se encontraron elementos con la clase 'slider-item'. Verifica el HTML.");
    return; // Detener si no hay elementos
  }

  if (!slider) {
    console.error("No se encontró el contenedor del slider. Verifica el HTML.");
    return; // Detener si no hay contenedor
  }

  // Función para mover el slider automáticamente cada 3 segundos
  let autoSlide = setInterval(() => {
    moveSlide(1);
  }, 3000);

  function moveSlide(step) {
    slideIndex += step;

    if (slideIndex >= totalSlides) {
      slideIndex = 0;
    } else if (slideIndex < 0) {
      slideIndex = totalSlides - 1;
    }

    updateSliderPosition();
  }

  function updateSliderPosition() {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    console.log(`Slide actual: ${slideIndex}`);
  }

  // Eventos para las flechas de navegación
  document.querySelector('.prev')?.addEventListener('click', () => {
    console.log("Flecha izquierda clickeada");
    clearInterval(autoSlide); // Detiene el auto-slide temporalmente
    moveSlide(-1);
    restartAutoSlide(); // Reinicia el auto-slide
  });

  document.querySelector('.next')?.addEventListener('click', () => {
    console.log("Flecha derecha clickeada");
    clearInterval(autoSlide); // Detiene el auto-slide temporalmente
    moveSlide(1);
    restartAutoSlide(); // Reinicia el auto-slide
  });

  // Función para reiniciar el auto-slide después de interacción manual
  function restartAutoSlide() {
    autoSlide = setInterval(() => {
      moveSlide(1);
    }, 3000);
  }

  // Código opcional: Detener el auto-slide si el cursor pasa sobre el slider
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
    console.log("Auto-slide pausado por hover");
  });

  slider.addEventListener('mouseleave', () => {
    restartAutoSlide();
    console.log("Auto-slide reiniciado después de hover");
  });

  // Código para la animación de números binarios
  const binaryContainer = document.getElementById('binary-bg');
  
  if (binaryContainer) {
    // Crear flujos binarios
    for (let i = 0; i < 30; i++) {  // Número de columnas de números binarios
      const binaryStream = document.createElement('div');
      binaryStream.classList.add('binary-stream');
      
      // Generar números binarios aleatorios
      const binaryNumbers = Array.from({ length: 20 }, () => Math.round(Math.random())).join('<br>');
      binaryStream.innerHTML = binaryNumbers;
      
      // Posiciona cada flujo binario aleatoriamente
      binaryStream.style.left = `${i * 3}%`;  // Ajusta la distancia entre columnas
      binaryContainer.appendChild(binaryStream);
      
      // Aplica animación de desplazamiento vertical a cada flujo binario
      binaryStream.style.animation = `scroll ${Math.random() * 5 + 5}s linear infinite`;  // Duración aleatoria
    }
  }
});
