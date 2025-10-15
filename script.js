// =======================
// CARRUSEL DE IMÁGENES (ping-pong)
// =======================

let index = 0;
let imageDirection = 1;

const inner = document.getElementById("carouselInner");
const items = document.querySelectorAll(".carousel-item");
const total = items.length;

function updateCarousel() {
  inner.style.transform = `translateX(${-index * 100}%)`;
}

function moveSlide(step) {
  if (step !== 0) {
    index = (index + step + total) % total;
  } else {
    if (index >= total - 1) imageDirection = -1;
    if (index <= 0) imageDirection = 1;
    index = index + imageDirection;
  }
  updateCarousel();
}

// Asegúrate de que los botones existan antes de llamar a moveSlide
if (items.length > 0) {
    setInterval(() => moveSlide(0), 3000);
}



// =======================
// CARRUSEL DE TARJETAS (loop infinito)
// =======================

const carouselData = [
  {
    image: "images/examenes.png",
    title: "Examenes - Nivel medio",
    description: "Solicitar permisos de examenes Nivel Medio",
    buttonText: "Acceder",
    url: "https://escom44.com.ar/nivelmedio/index.php"
  },
  {
    image: "images/contacto.png",
    title: "Contacto",
    description: "Conoce los formularios de consultas e inscripciones",
    buttonText: "Contactanos",
    url: "CONTACTO/index.html"
  },
  {
    image: "images/iconodoc.png",
    title: "Acceso Docente",
    description: "Información importante",
    buttonText: "Acceder",
    url: "ACCESO DOCENTE/index.html"
  },
  
  {
    image: "images/gamepad-2.svg",
    title: "Juego de conocimiento",
    description: "Pon a prueba tus conocimientos sobre la ESCOM44",
    buttonText: "Jugar",
    url: "JUEGO/index.html"
  },
  {
    image: "images/intranet.png",
    title: "Intranet - Nivel Superior",
    description: "Ingresa a la Intranet del Nivel Superior",
    buttonText: "Acceder",
    url: "https://escom44.com.ar/superior/login/index.php"
  },
  {
    image: "images/medio.png",
    title: "Nivel Medio - Oferta educativa",
    description: "Conoce la propuesta educativa del nivel medio",
    buttonText: "Ver info",
    url: "NIVELMEDIO/index.html"
  },
  {
    image: "images/superior.png",
    title: "Nivel Superior - Oferta educativa",
    description: "Conoce la propuesta educativa del nivel superior",
    buttonText: "Ver info",
    url: "NIVELSUPERIOR/index.html"
  },
];

let currentIndex = 0;
const carouselTrack = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dotsContainer');

// Crear tarjetas triplicadas para efecto infinito
function createCards() {
  if (!carouselTrack || !dotsContainer) return; // Salir si los elementos no existen

  // Crear 3 copias de las tarjetas para el loop infinito
  const tripleData = [...carouselData, ...carouselData, ...carouselData];
  
  tripleData.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.title}" class="card-image">
      <div class="card-content">
        <div>
          <h3 class="card-title">${card.title}</h3>
          <p class="card-description">${card.description}</p>
        </div>
        <button class="card-button" onclick="handleButtonClick('${card.url || '#'}')">${card.buttonText}</button>
      </div>
    `;
    carouselTrack.appendChild(cardElement);
  });

  // Crear dots solo para las tarjetas originales
  carouselData.forEach((card, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  // Posicionar en el set del medio
  currentIndex = carouselData.length;
  updatePosition(false);
}

// Actualizar posición (CÁLCULO DINÁMICO)
function updatePosition(animate = true) {
  if (!carouselTrack) return;
  
  // Obtener la primera tarjeta para calcular su ancho real (incluido el de móvil)
  const firstCard = document.querySelector('.card');
  if (!firstCard) return; 

  const cardWidth = firstCard.offsetWidth; // Ancho del elemento (300px o 100% en móvil)
  const cardStyle = getComputedStyle(firstCard);
  const cardMargin = parseFloat(cardStyle.marginRight) || 0; // Margen derecho (60px o 0 en móvil)
  const totalMovement = cardWidth + cardMargin;
  
  const translateX = -currentIndex * totalMovement;
  
  if (!animate) {
    carouselTrack.style.transition = 'none';
  } else {
    carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
  }
  
  carouselTrack.style.transform = `translateX(${translateX}px)`;
  
  // Actualizar dots
  const actualIndex = currentIndex % carouselData.length;
  document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === actualIndex);
  });
  
  // Reset position si llegamos a los extremos
  // Usamos requestAnimationFrame para asegurar que el DOM ha terminado su renderizado
  // antes de forzar el reseteo sin animación.
  setTimeout(() => {
    if (currentIndex >= carouselData.length * 2) {
      currentIndex = carouselData.length;
      updatePosition(false);
    } else if (currentIndex < carouselData.length) {
      currentIndex = carouselData.length;
      updatePosition(false);
    }
  }, animate ? 600 : 0);
}

// Ir a una tarjeta específica
function goToSlide(i) {
  const currentSet = Math.floor(currentIndex / carouselData.length);
  currentIndex = currentSet * carouselData.length + i;
  updatePosition(true);
}

// Auto-slide continuo
function autoSlideCards() {
  currentIndex++;
  updatePosition(true);
}

function handleButtonClick(url) {
  if (url && url !== '#') window.location.href = url;
}

// Inicializar
createCards();

// Solo iniciar el intervalo si el carrusel existe
if (carouselTrack) {
    setInterval(autoSlideCards, 3000);
}

// Responsive (CORRECCIÓN CLAVE PARA EL ERROR)
function adjustForMobile() {
  const isMobileView = window.innerWidth <= 768;
  const cardElements = document.querySelectorAll('.card');
  
  // Restaurar el min-width al valor original para que el CSS de escritorio funcione
  cardElements.forEach(card => {
    // Si la media query está activa, min-width: 100% (esto ya lo hace el CSS)
    // Si la media query NO está activa, restauramos el valor de escritorio.
    if (!isMobileView) {
      card.style.minWidth = '300px'; 
    } else {
      // En móvil, aseguramos el 100% por si acaso
      card.style.minWidth = '100%';
    }
  });

  // Forzar un recálculo de posición para que el translateX se actualice 
  // con los anchos correctos (300px para PC, 100% para móvil)
  updatePosition(false); 
}

window.addEventListener('resize', adjustForMobile);
adjustForMobile(); // Llamar al inicio

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces que funcionan como "toggle" (interruptor)
    const toggles = document.querySelectorAll('.dropdown-toggle');
    
    // Función para verificar si estamos en un ancho de pantalla móvil
    const isMobile = () => window.innerWidth <= 768;

    toggles.forEach(toggle => {
        // Obtenemos el contenedor del submenú (el div.dropdown-content)
        const content = toggle.nextElementSibling;
        const dropdown = toggle.closest('.dropdown');
        
        // Escuchamos el evento de clic en el enlace principal
        toggle.addEventListener('click', (e) => {
            
            // Si NO estamos en móvil, dejamos que el evento pase
            if (!isMobile()) {
                // Aquí el evento pasa, permitiendo que el CSS de hover funcione
                return;
            }
            
            // --- CÓDIGO SOLO PARA MÓVIL ---
            
            e.preventDefault(); // Evita que el enlace de menú navegue
            
            // Alterna (pone o quita) la clase 'open' en el contenedor principal
            dropdown.classList.toggle('open');
            
            // Ajusta la altura del contenido del submenú para la animación
            if (dropdown.classList.contains('open')) {
                // Si se está abriendo, establece la altura real
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Si se está cerrando, establece la altura a 0
                content.style.maxHeight = "0";
            }
            
            // Cerrar otros submenús abiertos al abrir uno nuevo
            document.querySelectorAll('.dropdown.open').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                    otherDropdown.querySelector('.dropdown-content').style.maxHeight = "0";
                }
            });
            
        });
        
        // Cierre el submenú si la ventana pasa a modo de escritorio (más de 768px)
        window.addEventListener('resize', () => {
             if (!isMobile() && dropdown.classList.contains('open')) {
                 dropdown.classList.remove('open');
                 content.style.maxHeight = "none"; // Dejamos que el CSS de escritorio tome control
             }
        });
    });
});

// ... (código existente de script.js) ...

// =======================
// LOADER MANAGEMENT
// =======================

let minTimeElapsed = false;
let pageFullyLoaded = false;
const loader = document.getElementById('page-loader');

function hideLoader() {
  if (minTimeElapsed && pageFullyLoaded && loader) {
    // 1. Añadir la clase 'hidden' para el efecto de fade out (opacity 0)
    loader.classList.add('hidden'); 
    
    // Opcional: Remover del DOM después de que termine la animación (0.5s)
    setTimeout(() => {
        //loader.remove(); // Descomentar si desea removerlo totalmente del HTML
    }, 500); 
  }
}

// Condición 1: Temporizador mínimo de 3 segundos
setTimeout(() => {
  minTimeElapsed = true;
  hideLoader(); // Intenta ocultar el loader
}, 3000); 

// Condición 2: La página y todos los recursos (imágenes, iframes, etc.) han cargado
window.addEventListener('load', () => {
  pageFullyLoaded = true;
  hideLoader(); // Intenta ocultar el loader
});