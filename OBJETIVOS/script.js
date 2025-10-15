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
        });
    });
});
// Animación de entrada para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.objective-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Efecto de parallax sutil
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});


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