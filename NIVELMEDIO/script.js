function openModal(modalidad) {
    document.getElementById(modalidad + '-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeModal(modalidad) {
    document.getElementById(modalidad + '-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// SE ELIMINA la función toggleModalidades

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// El efecto de brillo del h1 en el movimiento del ratón ha sido eliminado.

function createParticles() {
    const background = document.querySelector('.background');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '1';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        // Se corrige la animación de las partículas
        particle.style.animation = `float ${Math.random() * 10 + 15}s infinite ease-in-out`; 
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        background.appendChild(particle);
    }
}

window.addEventListener('load', createParticles);

// La lógica del formulario de inscripción se mantiene
document.getElementById('inscripcionForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        document.getElementById('successMessage').style.display = 'block';
        
        document.getElementById('inscripcionForm').reset();
        
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces que funcionan como "toggle" (interruptor)
    const toggles = document.querySelectorAll('.dropdown-toggle');
    
    // Solo queremos que esto funcione en móvil (cuando la barra está oculta)
    const isMobile = () => window.innerWidth <= 768;

    toggles.forEach(toggle => {
        // Obtenemos el contenedor del submenú (el div.dropdown-content)
        const content = toggle.nextElementSibling;
        
        // Obtenemos el contenedor principal (el div.dropdown)
        const dropdown = toggle.closest('.dropdown');
        
        // Escuchamos el evento de clic en el enlace principal
        toggle.addEventListener('click', (e) => {
            // Si estamos en móvil (ancho <= 768px)
            if (isMobile()) {
                e.preventDefault(); // Evita que el enlace intente navegar
                
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
            }
            // En escritorio, el evento default (el hover del CSS) sigue funcionando
        });
    });
});

// ===================================
// FUNCIÓN PARA LOADER AL HACER CLIC CON RETARDO Y DESAPARICIÓN FINAL
// ===================================

/**
 * Muestra el loader por un tiempo definido (delayMs) y luego redirige a la URL.
 */
function delayAndRedirect(url, delayMs) {
    const pageLoader = document.getElementById('page-loader');

    if (pageLoader) {
        // 1. Mostrar Forzosamente el Loader
        pageLoader.classList.remove('hidden');
        pageLoader.style.display = 'flex'; // Asegura que se muestre como overlay
        pageLoader.style.opacity = '1'; 

        // 2. Establecer el Retardo y la Redirección
        setTimeout(() => {
            // 3. Ocultar el loader (aplicando la transición CSS)
            pageLoader.classList.add('hidden');
            
            // 4. Abrir la URL en una nueva ventana
            window.open(url, '_blank');
            
            // Opcional: Después de que la transición CSS termine (ej: 0.7s), 
            // asegúrate de que el elemento ya no ocupe espacio.
            setTimeout(() => {
                 pageLoader.style.display = 'none';
            }, 700); 

        }, delayMs); 
    } else {
        // Fallback inmediato si no se encuentra el loader
        window.open(url, '_blank');
    }
}


let minTimeElapsed = false;
let pageFullyLoaded = false;
const loader = document.getElementById('page-loader');

function hideLoader() {
  if (minTimeElapsed && pageFullyLoaded && loader) {
    // 1. Añadir la clase 'hidden' para el efecto de fade out (opacity 0)
    loader.classList.add('hidden'); 
    
    // Opcional: Asegurarse de que el elemento ya no ocupe espacio después del fade out
    loader.addEventListener('transitionend', function handler() {
        if(loader.classList.contains('hidden')) {
            loader.style.display = 'none';
        }
        loader.removeEventListener('transitionend', handler);
    });
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