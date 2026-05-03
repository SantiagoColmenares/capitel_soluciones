// --- LÓGICA DEL MENÚ MÓVIL ---
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

toggle.addEventListener("click", () => {
    toggle.dataset.open === "true" ? closeMenu() : openMenu();
});

// Cerrar al hacer click en un link
links.forEach(el => el.addEventListener("click", closeMenu));

// Cerrar al pasar a desktop
window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
});


// --- LÓGICA DE MODALES Y SLIDER (DINÁMICO) ---
let currentIndex = 0;
const track = document.getElementById('slider-track');
const counter = document.getElementById('slide-counter');

/**
 * Actualiza la posición del slider y el contador de forma dinámica
 */
function updateSlider() {
    if (!track) return;

    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;

    // Asegurar que el índice no se salga de los límites
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;

    // Mover la tira de imágenes
    const percentage = currentIndex * -100;
    track.style.transform = `translateX(${percentage}%)`;

    // Actualizar el número de página dinámicamente
    if (counter) {
        counter.innerText = `${currentIndex + 1} / ${totalSlides}`;
    }
}

function nextSlide() {
    currentIndex++;
    updateSlider();
}

function prevSlide() {
    currentIndex--;
    updateSlider();
}

/**
 * Abre el modal y reinicia el slider
 */
function openModal(id) {
    const dialog = document.getElementById(id);
    if (dialog) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        // Reiniciar el slider al abrir para que siempre empiece en la foto 1
        currentIndex = 0;
        updateSlider();
    }
}

/**
 * Cierra el modal y restaura el scroll
 */
function closeModal(id) {
    const dialog = document.getElementById(id);
    if (dialog) {
        dialog.close();
        document.body.style.overflow = 'auto';
    }
}

// Cerrar al hacer clic fuera del contenido (backdrop) para todos los dialogs
const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeModal(dialog.id);
    });
});

// Soporte para flechas del teclado cuando el modal está abierto
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-arkanto');
    if (modal && modal.open) {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    }
});


// --- CARRUSEL PRINCIPAL DE LA WEB (CON DOTS) ---
let currentMainSlide = 0;
const mainTrack = document.getElementById('main-carousel-track');
const dotsContainer = document.getElementById('dots-container');

function createDots() {
    if (!dotsContainer || !mainTrack) return;
    
    const slides = mainTrack.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    
    dotsContainer.innerHTML = ""; // Limpiar antes de generar

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `main-dot h-3 rounded-full transition-all cursor-pointer ${i === 0 ? 'bg-primary-lime w-8' : 'bg-white/50 w-3'}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateMainCarousel() {
    if (!mainTrack) return;
    
    const slides = mainTrack.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (currentMainSlide >= totalSlides) currentMainSlide = 0;
    if (currentMainSlide < 0) currentMainSlide = totalSlides - 1;

    mainTrack.style.transform = `translateX(-${currentMainSlide * 100}%)`;

    const allDots = document.querySelectorAll('.main-dot');
    allDots.forEach((dot, index) => {
        if (index === currentMainSlide) {
            dot.className = 'main-dot h-3 rounded-full transition-all cursor-pointer bg-primary-lime w-8';
        } else {
            dot.className = 'main-dot h-3 rounded-full transition-all cursor-pointer bg-white/50 w-3';
        }
    });
}

function moveMainCarousel(direction) {
    const slides = mainTrack.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    currentMainSlide = (currentMainSlide + direction + totalSlides) % totalSlides;
    updateMainCarousel();
}

function goToSlide(index) {
    currentMainSlide = index;
    updateMainCarousel();
}

// Inicialización del Carrusel Principal
document.addEventListener("DOMContentLoaded", () => {
    createDots();
});