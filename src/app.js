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
