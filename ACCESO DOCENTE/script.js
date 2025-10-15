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
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas (Requiere la librería particles.min.js en el HTML)
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4facfe" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#4facfe", opacity: 0.4, width: 1 },
            move: {
                enable: true, speed: 2, direction: "none", out_mode: "out",
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Elementos del DOM
    const navItems = document.querySelectorAll('.nav-item');
    const contentTitle = document.getElementById('contentTitle');
    const viewerPlaceholder = document.getElementById('viewerPlaceholder');
    const viewerFrame = document.getElementById('viewerFrame');
    const hologramLoader = document.getElementById('hologramLoader');
    const viewerControls = document.getElementById('viewerControls');
    const menuToggle = document.getElementById('menuToggle'); // ESTE ELEMENTO SE BUSCA
    const navPanel = document.getElementById('navPanel');

    // Función para cargar un documento/portal
    function loadDocument(url, title, type) {
        // Actualizar título con efecto neón
        contentTitle.textContent = title;

        // Mostrar loader holográfico
        hologramLoader.style.display = 'flex';
        viewerFrame.style.display = 'none';
        viewerPlaceholder.style.display = 'none';
        viewerControls.style.display = 'none';

        // Simular un pequeño tiempo de carga
        setTimeout(() => {
            hologramLoader.style.display = 'none';

            if (type === 'externo') {
                // Si es externo → abrir directamente el enlace en nueva pestaña
                window.open(url, '_blank');
                return; // cortar la función acá, no muestra nada en el visor
            }

            // Para PDFs e imágenes, cargarlos en el iframe
            viewerFrame.style.display = 'block';
            viewerFrame.setAttribute('src', url);
            viewerFrame.onload = () => {
                hologramLoader.style.display = 'none';
            };

            // Acción de descarga
            document.getElementById('downloadBtn').onclick = function() {
                window.open(url, '_blank');
            };

            // Mostrar botones de zoom
            document.getElementById('zoomOutBtn').style.display = 'flex';
            document.getElementById('zoomResetBtn').style.display = 'flex';
            document.getElementById('zoomInBtn').style.display = 'flex';

            // Mostrar controles (Descarga/Abrir, Fullscreen)
            viewerControls.style.display = 'flex';

            // Resetear zoom
            zoomLevel = 1;
            viewerFrame.style.transform = `scale(${zoomLevel})`;
        }, 300);
    }

    // Funcionalidad de zoom para iframe
    let zoomLevel = 1;
    document.getElementById('zoomInBtn').addEventListener('click', function() {
        if (viewerFrame.style.display === 'block') {
            zoomLevel += 0.25;
            viewerFrame.style.transform = `scale(${zoomLevel})`;
        }
    });

    document.getElementById('zoomOutBtn').addEventListener('click', function() {
        if (viewerFrame.style.display === 'block' && zoomLevel > 0.5) {
            zoomLevel -= 0.25;
            viewerFrame.style.transform = `scale(${zoomLevel})`;
        }
    });

    document.getElementById('zoomResetBtn').addEventListener('click', function() {
        if (viewerFrame.style.display === 'block') {
            zoomLevel = 1;
            viewerFrame.style.transform = `scale(${zoomLevel})`;
        }
    });

    // Pantalla completa
    document.getElementById('fullscreenBtn').addEventListener('click', function() {
        const viewerContainer = document.querySelector('.viewer-container');
        if (viewerContainer.requestFullscreen) {
            viewerContainer.requestFullscreen();
        } else if (viewerContainer.webkitRequestFullscreen) {
            viewerContainer.webkitRequestFullscreen();
        } else if (viewerContainer.msRequestFullscreen) {
            viewerContainer.msRequestFullscreen();
        }
    });

    // Toggle del menú en móviles
    if (menuToggle) { // ESTA ES LA LÓGICA QUE SE ACTIVA
        menuToggle.addEventListener('click', function() {
            navPanel.classList.toggle('active');
        });
    }

    // Eventos de navegación
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const url = this.getAttribute('data-url');
            const title = this.querySelector('.nav-name').textContent;
            const type = this.getAttribute('data-type');

            loadDocument(url, title, type);

            if (window.innerWidth <= 1024) {
                navPanel.classList.remove('active');
            }
        });
    });

    // Cargar el primer documento por defecto
    const firstItem = document.querySelector('.nav-item');
    if (firstItem) firstItem.click();
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