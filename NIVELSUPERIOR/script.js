// Función para mostrar la sección de carrera seleccionada
function mostrarCarrera(carrera) {
    // Ocultar todas las secciones de carrera
    const secciones = document.querySelectorAll('.carrera-section');
    secciones.forEach(sec => sec.classList.remove('active'));

    // Mostrar la sección correspondiente
    const seccionActiva = document.getElementById(carrera);
    if (seccionActiva) {
        seccionActiva.classList.add('active');
    }
}

// Función para manejar las pestañas de información práctica
function openTab(event, tabId) {
    // Obtener la sección de carrera padre para manejar las pestañas solo dentro de esa sección
    const parentSection = event.target.closest('.carrera-section');

    // Ocultar todos los contenidos de pestañas en la sección actual
    const tabContents = parentSection.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remover la clase 'active' de todas las pestañas
    const tabs = parentSection.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar el contenido de la pestaña actual
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
        tabContent.classList.add('active');
    }

    // Agregar la clase 'active' a la pestaña clicada
    event.currentTarget.classList.add('active');
}
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            
            // Cierra todos los otros items del acordeón
            document.querySelectorAll('.accordion-item.active').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                }
            });

            // Alterna la clase 'active' en el item actual
            accordionItem.classList.toggle('active');
        });
    });
});

// --- Lógica del Cuestionario Corregida ---

let puntajes = {
    sistemas: 0,
    gestion: 0
};
const totalPreguntas = 10;
// Usaremos un Set para rastrear las preguntas respondidas de forma única
let preguntasRespondidasUnicas = new Set();

function seleccionarOpcion(opcionSeleccionada, carrera) {
    const preguntaDiv = opcionSeleccionada.closest('.pregunta');
    // Obtener un identificador único para la pregunta (su posición en el DOM, por ejemplo)
    const preguntaId = Array.from(document.querySelectorAll('.pregunta')).indexOf(preguntaDiv);

    // 1. Manejar la deselección de una opción previa en esta misma pregunta
    const opcionPreviamenteSeleccionada = preguntaDiv.querySelector('.opcion.selected');

    if (opcionPreviamenteSeleccionada) {
        // Obtener la carrera de la opción que se va a deseleccionar
        const carreraAnterior = opcionPreviamenteSeleccionada.getAttribute('onclick').match(/'([^']*)'/)[1];
        
        // Restar el puntaje de la carrera anterior
        puntajes[carreraAnterior]--;
        
        // Remover la clase 'selected'
        opcionPreviamenteSeleccionada.classList.remove('selected');
    }

    // 2. Marcar la nueva opción como seleccionada y actualizar el puntaje
    opcionSeleccionada.classList.add('selected');
    puntajes[carrera]++;

    // 3. Registrar la pregunta como respondida (si no lo estaba)
    if (!preguntasRespondidasUnicas.has(preguntaId)) {
        preguntasRespondidasUnicas.add(preguntaId);
    }
    
    // 4. Revisar si todas las preguntas han sido respondidas
    if (preguntasRespondidasUnicas.size === totalPreguntas) {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let resultadoCarrera;
    let textoResultado;

    if (puntajes.sistemas > puntajes.gestion) {
        resultadoCarrera = 'sistemas';
        textoResultado = "Tu perfil se alinea fuertemente con la **Tecnicatura Superior en Análisis Funcional de Sistemas Informáticos**.";
        
    } else if (puntajes.gestion > puntajes.sistemas) {
        resultadoCarrera = 'gestion';
        textoResultado = "Tu perfil se alinea fuertemente con la **Tecnicatura Superior en Gestión Industrial**.";

    } else {
        resultadoCarrera = 'empate';
        textoResultado = "Tienes un perfil balanceado. Te recomendamos explorar ambas carreras a fondo para tomar la mejor decisión.";
    }
    
    // Añadir información adicional y personalizar el mensaje
    if (resultadoCarrera === 'sistemas') {
        textoResultado += "<br><br>Parece que te inclinas por la lógica, el análisis de datos y el desarrollo de soluciones digitales. ¡Estás listo para conectar ideas y transformar sistemas!";
    } else if (resultadoCarrera === 'gestion') {
        textoResultado += "<br><br>Parece que te inclinas por el liderazgo, la optimización de procesos y la coordinación de equipos. ¡Estás listo para formar parte de la industria del mañana!";
    }

    const resultadoDiv = document.getElementById('resultado-cuestionario');
    const textoResultadoP = document.getElementById('texto-resultado');
    
    if (resultadoDiv && textoResultadoP) {
        textoResultadoP.innerHTML = textoResultado;
        
        // Aplicar estilos de la carrera ganadora al resultado
        // Se añade una clase que no existe en el CSS para no sobreescribir estilos
        // pero que permite identificar la carrera para futuros usos si se desea
        
        resultadoDiv.classList.add('show');
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

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

