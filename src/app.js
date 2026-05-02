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

// Cerrar al hacer click
links.forEach(el => el.addEventListener("click", closeMenu));

// Cerrar al pasar a desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) closeMenu();
});



function openModal(id) {
    const modal = document.getElementById(id);
    modal.showModal();
    // Evita scroll en el body al abrir
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.close();
    // Devuelve el scroll al cerrar
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera del contenido (en el backdrop)
const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeModal(dialog.id);
    });
});


let currentIndex = 0;
const track = document.getElementById('slider-track');
const counter = document.getElementById('slide-counter');

function updateSlider() {
    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;
    
    // Asegurar que el índice no se salga de los límites
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;

    // Mover la tira de imágenes
    const percentage = currentIndex * -100;
    track.style.transform = `translateX(${percentage}%)`;
    
    // Actualizar el número de página
    counter.innerText = `${currentIndex + 1} / ${totalSlides}`;
}

function nextSlide() {
    currentIndex++;
    updateSlider();
}

function prevSlide() {
    currentIndex--;
    updateSlider();
}

// Funciones del Modal
function openModal(id) {
    const dialog = document.getElementById(id);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    // Reiniciar el slider al abrir
    currentIndex = 0;
    updateSlider();
}

function closeModal(id) {
    const dialog = document.getElementById(id);
    dialog.close();
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera
document.getElementById('modal-arkanto').addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
});

// Soporte para flechas del teclado
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-arkanto');
    if (modal.open) {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    }
});