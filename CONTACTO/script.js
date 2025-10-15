document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del contador de caracteres del textarea (sin cambios)
    const mensajeTextarea = document.getElementById('mensaje');
    const charCounter = document.querySelector('.char-counter');
    const maxChars = 500;

    // Solo agregar el listener si el elemento existe
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('input', () => {
            const currentLength = mensajeTextarea.value.length;
            charCounter.textContent = `${currentLength}/${maxChars} caracteres`;
            charCounter.style.color = currentLength > maxChars ? 'red' : '#777';
        });
    }

    // 2. Funcionalidad de las pestañas (tabs) y campos dinámicos
    const tabButtons = document.querySelectorAll('.tab-button');
    const contactForm = document.getElementById('contact-form');
    const dniField = document.getElementById('dni-field');
    const nivelField = document.getElementById('nivel-field');
    const carreraField = document.getElementById('carrera-field');
    const mensajeField = document.getElementById('mensaje-field');
    const buttonText = document.getElementById('button-text');
    const nivelSelect = document.getElementById('nivel');
    const carreraSelect = document.getElementById('carrera');

    // Mapeo de opciones para el desplegable de carrera/orientación
    const opcionesCarrera = {
        'secundario': ['Naturales', 'Sociales', 'Economía'],
        'terciario': ['Gestión Industrial', 'Análisis de Sistemas']
    };

    // Función para mostrar los campos de "Inscripción" y ocultar el de "Consulta General"
    const showInscripcionFields = () => {
        // Muestra los campos de inscripción
        dniField.classList.remove('hidden-field');
        nivelField.classList.remove('hidden-field');
        carreraField.classList.remove('hidden-field');
        // Oculta el campo de mensaje de consulta
        mensajeField.classList.add('hidden-field');
        // Actualiza el texto del botón
        buttonText.textContent = 'Enviar Inscripción';
        
        // Establece los campos como requeridos
        document.getElementById('dni').setAttribute('required', 'required');
        document.getElementById('nivel').setAttribute('required', 'required');
        document.getElementById('carrera').setAttribute('required', 'required');
        document.getElementById('mensaje').removeAttribute('required');
    };

    // Función para mostrar los campos de "Consulta General" y ocultar los de "Inscripción"
    const showGeneralConsultaFields = () => {
        // Oculta los campos de inscripción
        dniField.classList.add('hidden-field');
        nivelField.classList.add('hidden-field');
        carreraField.classList.add('hidden-field');
        // Muestra el campo de mensaje
        mensajeField.classList.remove('hidden-field');
        // Actualiza el texto del botón
        buttonText.textContent = 'Enviar Consulta';

        // Restablece los atributos required
        document.getElementById('dni').removeAttribute('required');
        document.getElementById('nivel').removeAttribute('required');
        document.getElementById('carrera').removeAttribute('required');
        document.getElementById('mensaje').setAttribute('required', 'required');
    };

    // Itera sobre cada botón de pestaña para añadir el evento de click
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remueve la clase 'active' de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Agrega la clase 'active' al botón que fue clickeado
            e.target.classList.add('active');

            const tabType = e.target.dataset.tab;
            if (tabType === 'inscripcion') {
                showInscripcionFields();
            } else {
                showGeneralConsultaFields();
            }
        });
    });

    // 3. Funcionalidad del desplegable anidado (Nivel -> Carrera)
    nivelSelect.addEventListener('change', () => {
        const nivelSeleccionado = nivelSelect.value;
        // Limpia las opciones actuales del select de carrera
        carreraSelect.innerHTML = '<option value="">Selecciona una opción</option>';

        // Si se seleccionó un nivel válido, se llenan las opciones de carrera
        if (nivelSeleccionado) {
            const carreras = opcionesCarrera[nivelSeleccionado];
            carreras.forEach(carrera => {
                const option = document.createElement('option');
                option.value = carrera;
                option.textContent = carrera;
                carreraSelect.appendChild(option);
            });
        }
    });

    // 4. Funcionalidad del envío del formulario (manteniendo el comportamiento anterior)
    // contactForm.addEventListener('submit', (e) => {
    //     e.preventDefault(); // Evita que la página se recargue
    //
    //     // Lógica para enviar el formulario.
    //     // Puedes usar `e.target.dataset.tab` para saber qué formulario se está enviando.
    //
    //     alert('¡Tu mensaje/inscripción ha sido enviado con éxito!');
    //     contactForm.reset();
    // });
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

// ====================================
// === LÓGICA DEL LOADER DE PÁGINA ===
// ====================================

let minTimeElapsed = false;
let pageFullyLoaded = false;
const loader = document.getElementById('page-loader');

function hideLoader() {
    // Asegura que el loader solo se oculte cuando AMBAS condiciones se cumplan.
    if (minTimeElapsed && pageFullyLoaded && loader) {
        // 1. Añadir la clase 'hidden' para el efecto de fade out (opacity 0)
        loader.classList.add('hidden'); 
        
        // Opcional: Remover del DOM después de que termine la animación (0.5s)
        // setTimeout(() => {
        //     loader.remove(); // Descomentar si desea removerlo totalmente del HTML
        // }, 500); 
    }
}

// Condición 1: Temporizador mínimo de 3 segundos
setTimeout(() => {
    minTimeElapsed = true;
    hideLoader(); // Intenta ocultar el loader
}, 3000); 

// Condición 2: La página y todos los recursos (imágenes, iframes, etc.) han cargado
// Usamos 'window.addEventListener('load', ...)' para esperar todos los recursos.
window.addEventListener('load', () => {
    pageFullyLoaded = true;
    hideLoader(); // Intenta ocultar el loader
});