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
const images = [
    // 42 imágenes en un orden completamente mezclado
    { url: 'images/foto25.png' },
    { url: 'images/foto12.png' },
    { url: 'images/foto36.png' }, 
    { url: 'images/foto4.png' },
    { url: 'images/foto40.png' }, 
    { url: 'images/foto18.png' },
    { url: 'images/foto9.png' },
    { url: 'images/foto1.png' },
    { url: 'images/foto29.png' },
    { url: 'images/foto38.png' }, 
    { url: 'images/foto15.png' },
    { url: 'images/foto7.png' },
    { url: 'images/foto22.png' },
    { url: 'images/foto10.png' },
    { url: 'images/foto33.png' },
    { url: 'images/foto2.png' },
    { url: 'images/foto28.png' },
    { url: 'images/foto37.png' }, 
    { url: 'images/foto19.png' },
    { url: 'images/foto14.png' },
    { url: 'images/foto26.png' },
    { url: 'images/foto35.png' },
    { url: 'images/foto5.png' },
    { url: 'images/foto42.png' }, 
    { url: 'images/foto30.png' },
    { url: 'images/foto23.png' },
    { url: 'images/foto11.png' },
    { url: 'images/foto6.png' },
    { url: 'images/foto27.png' },
    { url: 'images/foto17.png' },
    { url: 'images/foto32.png' },
    { url: 'images/foto3.png' },
    { url: 'images/foto24.png' },
    { url: 'images/foto31.png' },
    { url: 'images/foto13.png' },
    { url: 'images/foto39.png' }, 
    { url: 'images/foto34.png' },
    { url: 'images/foto21.png' },
    { url: 'images/foto16.png' },
    { url: 'images/foto20.png' },
    { url: 'images/foto41.png' }, 
    { url: 'images/foto8.png' }
]; 

function createImageCard(img) {
    const altText = img.url.split('/').pop(); 

    return `
        <div class="image-card">
            <img src="${img.url}" alt="${altText}">
        </div>
    `;
}

function populateTrack(trackId, startIndex) {
    const track = document.getElementById(trackId);
    let html = '';
    
    // Genera las 42 imágenes una vez
    const totalImages = images.length;
    
    for (let i = 0; i < totalImages; i++) {
        const imgIndex = (startIndex + i) % totalImages;
        html += createImageCard(images[imgIndex]);
    }
    
    // Duplica el conjunto completo (42 imágenes) para el efecto infinito (ver 2 veces)
    html += html;
    track.innerHTML = html;
}

// Llama a la función para poblar los carriles
populateTrack('track1', 0);
populateTrack('track2', 7); 
populateTrack('track3', 14);


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
}, 1500); 

// Condición 2: La página y todos los recursos (imágenes, iframes, etc.) han cargado
window.addEventListener('load', () => {
  pageFullyLoaded = true;
  hideLoader(); // Intenta ocultar el loader
});