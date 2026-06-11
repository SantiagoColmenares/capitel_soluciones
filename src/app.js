/**
 * CAPITEL SOLUCIONES - Script Maestro
 * Incluye: Menú Móvil, Modales Dinámicos, Slider de Proyectos, 
 * Carrusel Principal y Animaciones de Scroll.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LÓGICA DEL MENÚ MÓVIL ---
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("menu-icon");
    const links = menu.querySelectorAll("a, button");

    const openMenu = () => {
        menu.classList.remove("max-h-0", "opacity-0", "py-0");
        menu.classList.add("max-h-[500px]", "opacity-100", "py-6");
        icon.textContent = "close";
        toggle.dataset.open = "true";
    };

    const closeMenu = () => {
        menu.classList.add("max-h-0", "opacity-0", "py-0");
        menu.classList.remove("max-h-[500px]", "opacity-100", "py-6");
        icon.textContent = "menu";
        toggle.dataset.open = "false";
    };

    if (toggle) {
        toggle.addEventListener("click", () => {
            toggle.dataset.open === "true" ? closeMenu() : openMenu();
        });
    }

    links.forEach(el => el.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) closeMenu();
    });


    // --- 2. LÓGICA DE MODALES Y SLIDER (DINÁMICO) ---
    let currentIndex = 0;

    // Función interna para obtener elementos del modal activo
    const getActiveSliderElements = () => {
        const activeModal = document.querySelector('dialog[open]');
        if (!activeModal) return null;
        return {
            track: activeModal.querySelector('.slider-track'),
            counter: activeModal.querySelector('.slide-counter')
        };
    };

    window.updateSlider = function() {
        const elements = getActiveSliderElements();
        if (!elements || !elements.track) return;

        const slides = elements.track.querySelectorAll('img');
        const totalSlides = slides.length;

        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        const percentage = currentIndex * -100;
        elements.track.style.transform = `translateX(${percentage}%)`;

        if (elements.counter) {
            elements.counter.innerText = `${currentIndex + 1} / ${totalSlides}`;
        }
    };

    window.nextSlide = function() {
        currentIndex++;
        updateSlider();
    };

    window.prevSlide = function() {
        currentIndex--;
        updateSlider();
    };

    window.openModal = function(id) {
        const dialog = document.getElementById(id);
        if (dialog) {
            currentIndex = 0; 
            dialog.showModal();
            document.body.style.overflow = 'hidden';
            updateSlider();
        }
    };

    window.closeModal = function(id) {
        const dialog = document.getElementById(id);
        if (dialog) {
            dialog.close();
            document.body.style.overflow = 'auto';
        }
    };

    // Cerrar al hacer clic fuera (backdrop)
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) closeModal(dialog.id);
        });
    });

    // Control por teclado
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('dialog[open]');
        if (activeModal) {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        }
    });


    // --- 3. CARRUSEL PRINCIPAL (HERO) ---
    let currentMainSlide = 0;
    const mainTrack = document.getElementById('main-carousel-track');
    const dotsContainer = document.getElementById('dots-container');

    function createDots() {
        if (!dotsContainer || !mainTrack) return;
        const slides = mainTrack.querySelectorAll('.carousel-item');
        dotsContainer.innerHTML = ""; 

        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `main-dot h-3 rounded-full transition-all cursor-pointer ${i === 0 ? 'bg-primary-lime w-8' : 'bg-white/50 w-3'}`;
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        });
    }

    window.updateMainCarousel = function() {
        if (!mainTrack) return;
        const slides = mainTrack.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;

        currentMainSlide = (currentMainSlide + totalSlides) % totalSlides;
        mainTrack.style.transform = `translateX(-${currentMainSlide * 100}%)`;

        const allDots = document.querySelectorAll('.main-dot');
        allDots.forEach((dot, index) => {
            dot.className = index === currentMainSlide 
                ? 'main-dot h-3 rounded-full transition-all cursor-pointer bg-primary-lime w-8' 
                : 'main-dot h-3 rounded-full transition-all cursor-pointer bg-white/50 w-3';
        });
    };

    window.moveMainCarousel = function(direction) {
        currentMainSlide += direction;
        updateMainCarousel();
    };

    window.goToSlide = function(index) {
        currentMainSlide = index;
        updateMainCarousel();
    };

    // Autoplay opcional para el carrusel principal (5 segundos)
    setInterval(() => moveMainCarousel(1), 5000);

    createDots();


    // --- 4. ANIMACIONES DE REVELADO (SCROLL) ---
    const targets = document.querySelectorAll('section, h2, .card, .proyecto-item, .before-after-container');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        if (target.closest('nav') || target.closest('footer')) return;
        target.classList.add('reveal-hidden');
        observer.observe(target);
    });

});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Detener el envío automático para validar primero
    event.preventDefault();

    // Obtener los campos
    const nombreInput = this.querySelector('input[name="nombre"]');
    const emailInput = this.querySelector('input[name="email"]');
    const asuntoInput = this.querySelector('input[name="subject"]');
    const mensajeInput = this.querySelector('textarea[name="mensaje"]');

    // 2. Eliminar espacios en blanco innecesarios al inicio y final
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const asunto = asuntoInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    // 3. Validación de campos vacíos
    if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor, rellene todos los campos obligatorios.");
        return;
    }

    // 4. Validación estricta de estructura de Email (Expresión Regular)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, introduce una dirección de correo electrónico válida.");
        emailInput.focus();
        return;
    }

    // 5. PROTECCIÓN CONTRA MALWARE / INYECCIÓN DE CÓDIGO (Sanitización)
    // Esta función convierte caracteres peligrosos como <script> en texto inofensivo
    function limpiarTexto(texto) {
        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Aplicar la limpieza antes de enviar
    nombreInput.value = limpiarTexto(nombre);
    asuntoInput.value = limpiarTexto(asunto);
    mensajeInput.value = limpiarTexto(mensaje);

    // 6. Si todo está correcto y limpio, enviar el formulario a Web3Forms
    this.submit();
});