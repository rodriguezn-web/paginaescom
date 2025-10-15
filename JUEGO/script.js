// Base de datos de preguntas sobre ESCOM 44
        const questions = [
            {
                question: "¿Cuál es el nombre completo de la institución?",
                options: [
                    "Escuela Secundaria de Comunicación N°44",
                    "Escuela de Educación Secundaria Orientada en Comunicación N°44",
                    "Escuela Superior De Comercio N°44",
                    "Escuela de Comunicación y Artes N°44"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Cuál de las siguientes afirmaciones describe correctamente a nuestra institución en su estado actual?",
                options: [
                    "Ofrece dos carreras técnicas de Nivel Superior (AFSI y Gestión Industrial)",
                    "Posee una orientación de Nivel Secundario centrada en Economía y Finanzas",
                    "Mantiene convenios con instituciones para prácticas y proyectos educativos",
                    "Todas las anteriores"
                ],
                correctAnswer: 3
            },
            {
                question: "¿Qué orientaciones ofrece nuestra escuela en su Nivel Medio?",
                options: [
                    "Cs Naturales, Estadística, Informática",
                    "Comunicación, Economía y Administración, Cs Sociales",
                    "Informática, Cs Naturales, Cs Sociales",
                    "Economía y Administración, Cs Sociales, Cs Naturales"
                ],
                correctAnswer: 3
            },
            {
                question: "¿Cuál de estas materias corresponde a 2do año de Gestión?",
                options: [
                    "Control de Gestión",
                    "Gestión de la Calidad",
                    "Gestión del Talento Humano",
                    "Gestión Financiera"
                ],
                correctAnswer: 1
            },
            {
                question: "¿Cuál es el nombre del actual rector de la institución?",
                options: [
                    "Marisa Della Schiava",
                    "Adriana Loretan ",
                    "Alejandro Cabo",
                    "Ariel Savino"
                ],
                correctAnswer: 3
            },
            {
                question: "¿Cómo se llamaba antes AFSI?",
                options: [
                    "Analista de Sistemas Administrativos",
                    "Técnico Superior en Informática",
                    "Programador de Sistemas Avanzados",
                    "Analista de Sistemas Contables"
                ],
                correctAnswer: 0
            },
            {
                question: "¿Cuántos años tiene la escuela?",
                options: [
                    "82",
                    "85",
                    "83",
                    "81"
                ],
                correctAnswer: 0
            },
            {
                question: "Al iniciar su funcionamiento, ¿cuál de los siguientes fue el nombre que tuvo la institución?",
                options: [
                    "Escuela Comercial",
                    "Escuela Técnica de la Comunicación Social.",
                    "Escuela de Artes y Oficios de la Nación",
                    "Escuela Superior de Comunicación y Oficios"
                ],
                correctAnswer: 2
            },
            {
                question: "¿Cuál es la dirección de nuestra institución?",
                options: [
                    "Sarmiento 767",
                    "Sarmiento 775",
                    "Sarmiento 755",
                    "Ninguna de las anteriores"
                ],
                correctAnswer: 2
            },
            {
                question: "¿En qué año fue fundada la institución?",
                options: [
                    "1941",
                    "1946",
                    "1943",
                    "1945"
                ],
                correctAnswer: 2
            }
        ];

        // Variables del juego
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedOption = null;
        let isAnswered = false;

        // Elementos del DOM
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const feedback = document.getElementById('feedback');
        const nextBtn = document.getElementById('next-btn');
        const restartBtn = document.getElementById('restart-btn');
        const currentQuestionEl = document.getElementById('current-question');
        const scoreEl = document.getElementById('score');
        const totalQuestionsEl = document.getElementById('total-questions');
        const gameArea = document.getElementById('game-area');
        const gameOverArea = document.getElementById('game-over');
        const finalScoreEl = document.getElementById('final-score');
        const finalTotalEl = document.getElementById('final-total');
        const resultMessageEl = document.getElementById('result-message');
        const playAgainBtn = document.getElementById('play-again-btn');

        // Inicializar juego
        function initGame() {
            currentQuestionIndex = 0;
            score = 0;
            selectedOption = null;
            isAnswered = false;
            
            totalQuestionsEl.textContent = questions.length;
            updateScore();
            showQuestion();
            
            gameArea.style.display = 'block';
            gameOverArea.style.display = 'none';
        }

        // Mostrar pregunta actual
        function showQuestion() {
            const question = questions[currentQuestionIndex];
            questionText.textContent = question.question;
            currentQuestionEl.textContent = currentQuestionIndex + 1;
            
            // Limpiar opciones anteriores
            optionsContainer.innerHTML = '';
            feedback.textContent = '';
            feedback.classList.remove('show', 'correct', 'incorrect');
            
            // Crear opciones
            question.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.classList.add('option');
                optionEl.textContent = option;
                optionEl.dataset.index = index;
                
                optionEl.addEventListener('click', selectOption);
                optionsContainer.appendChild(optionEl);
            });
            
            // Resetear estado
            selectedOption = null;
            isAnswered = false;
            nextBtn.disabled = true;
        }

        // Seleccionar opción
        function selectOption(e) {
            if (isAnswered) return;
            
            // Limpiar selección anterior
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Marcar opción seleccionada
            const selected = e.target;
            selected.classList.add('selected');
            selectedOption = parseInt(selected.dataset.index);
            
            // Habilitar botón siguiente
            nextBtn.disabled = false;
        }

        // Verificar respuesta
        function checkAnswer() {
            if (selectedOption === null || isAnswered) return;
            
            isAnswered = true;
            const question = questions[currentQuestionIndex];
            const isCorrect = selectedOption === question.correctAnswer;
            
            // Mostrar retroalimentación
            if (isCorrect) {
                score++;
                updateScore();
                feedback.textContent = "¡Correcto! +10 puntos";
                feedback.classList.add('correct');
                
                // Marcar opción correcta
                document.querySelectorAll('.option')[selectedOption].classList.add('correct');
            } else {
                feedback.textContent = `Incorrecto. La respuesta correcta es: ${question.options[question.correctAnswer]}`;
                feedback.classList.add('incorrect');
                
                // Marcar opciones
                document.querySelectorAll('.option')[selectedOption].classList.add('incorrect');
                document.querySelectorAll('.option')[question.correctAnswer].classList.add('correct');
            }
            
            feedback.classList.add('show');
            
            // Habilitar botón siguiente
            nextBtn.disabled = false;
            nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? "Siguiente" : "Ver Resultados";
        }

        // Actualizar puntaje
        function updateScore() {
            scoreEl.textContent = score;
        }

        // Siguiente pregunta o finalizar juego
        function nextQuestion() {
            if (!isAnswered) {
                checkAnswer();
                return;
            }
            
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                showQuestion();
                nextBtn.textContent = "Siguiente";
            } else {
                endGame();
            }
        }

        // Finalizar juego
        function endGame() {
            gameArea.style.display = 'none';
            gameOverArea.style.display = 'block';
            
            finalScoreEl.textContent = score;
            finalTotalEl.textContent = questions.length;
            
            // Mensaje según puntaje
            const percentage = (score / questions.length) * 100;
            let message = '';
            let messageClass = '';
            
            if (percentage >= 90) {
                message = "¡EXCELENTE! ¡Conoces muy bien nuestra institución!";
                messageClass = 'excellent';
            } else if (percentage >= 70) {
                message = "¡MUY BUEN TRABAJO! Conoces bien la ESCOM 44";
                messageClass = 'good';
            } else if (percentage >= 50) {
                message = "BUEN INTENTO. Sigue aprendiendo sobre nuestra escuela";
                messageClass = 'average';
            } else {
                message = "Sigue participando. Te invitamos a conocer más sobre la ESCOM 44";
                messageClass = 'poor';
            }
            
            resultMessageEl.textContent = message;
            resultMessageEl.className = `result-message ${messageClass}`;
        }

        // Reiniciar juego
        function restartGame() {
            initGame();
        }

        // Event Listeners
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartGame);
        playAgainBtn.addEventListener('click', restartGame);

        // Iniciar juego al cargar
        initGame();

        
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