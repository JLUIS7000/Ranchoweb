// --- Menú hamburguesa ---
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  const isOpen = navMenu.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú al tocar un link (útil en móvil, para no dejarlo abierto)
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});