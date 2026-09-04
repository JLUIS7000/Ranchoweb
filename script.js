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

// --- Mapa de ubicación (Leaflet + OpenStreetMap, gratis, sin necesitar API key) ---
const mapElement = document.querySelector('#map');

if (mapElement) {
  // Coordenadas de Santa María Atzompa, Oaxaca (centro del pueblo).
  // Si tienes la ubicación exacta del rancho, reemplaza estos 2 números.
  const ranchoCoords = [17.1011, -96.7778];

  const map = L.map('map').setView(ranchoCoords, 15); // 15 = nivel de zoom inicial

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  L.marker(ranchoCoords)
    .addTo(map)
    .bindPopup('Rancho Santa Catalina')
    .openPopup();

  // Botón "Cómo llegar": abre la ruta directo en Google Maps (o en la app, si el usuario está en el celular)
  const btnComoLlegar = document.querySelector('#btn-como-llegar');
  if (btnComoLlegar) {
    btnComoLlegar.href = `https://www.google.com/maps/dir/?api=1&destination=${ranchoCoords[0]},${ranchoCoords[1]}`;
  }
}