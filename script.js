// --- Menú hamburguesa ---
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active'); // activa la animación de hamburguesa -> X

  const isOpen = navMenu.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú al tocar un link (útil en móvil, para no dejarlo abierto)
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active'); // regresa el ícono a hamburguesa normal
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// --- Lightbox de la galería (agrandar imágenes al tocarlas) ---
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galeriaImgs = document.querySelectorAll('.galeria-grid img');

galeriaImgs.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

function cerrarLightbox() {
  lightbox.classList.remove('active');
}

lightboxClose.addEventListener('click', cerrarLightbox);

// clic fuera de la imagen (en el fondo negro) también cierra
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    cerrarLightbox();
  }
});