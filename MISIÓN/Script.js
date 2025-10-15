document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------
    // --- LÓGICA DEL LOADER (2 SEGUNDOS) ---
    // ESTA LÓGICA AHORA ESTÁ ENCAPSULADA EN DOMContentLoaded
    // -------------------------------------
    const loader = document.getElementById('page-loader');

    function hideLoader() {
      if (loader) {
        // Aplica la clase que el CSS debe usar para ocultar el loader
        loader.classList.add('hidden'); 
        
        // Opcional: Remover del DOM después de que termine la animación (0.5s)
        setTimeout(() => {
            // Esto asegura que el elemento ya no ocupe espacio si opacity: 0 falla por algún motivo.
            // if (loader) loader.remove(); 
        }, 500); 
      }
    }

    // Oculta el loader 2 segundos (2000 ms) después de que el DOM esté listo.
    setTimeout(() => {
      hideLoader(); 
    }, 2000); 
    
    
    // -------------------------------------
    // --- LÓGICA DEL DROPDOWN (MENÚ MÓVIL) ---
    // -------------------------------------

    const toggles = document.querySelectorAll('.dropdown-toggle');
    const isMobile = () => window.innerWidth <= 768;

    toggles.forEach(toggle => {
        const content = toggle.nextElementSibling;
        const dropdown = toggle.closest('.dropdown');
        
        toggle.addEventListener('click', (e) => {
            
            if (!isMobile()) {
                return;
            }
            
            e.preventDefault(); 
            dropdown.classList.toggle('open');
            
            if (dropdown.classList.contains('open')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
});