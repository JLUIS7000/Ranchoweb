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

// --- Ubicación: coordenadas exactas del Rancho Santa Catalina (Google Maps) ---
const ranchoCoords = [17.1041284, -96.781118];

// El botón "Cómo llegar" no depende del mapa (es solo un link a Google Maps),
// así que se arma de inmediato, sin esperar a que cargue nada más.
const btnComoLlegar = document.querySelector('#btn-como-llegar');
if (btnComoLlegar) {
  btnComoLlegar.href = `https://www.google.com/maps/dir/?api=1&destination=${ranchoCoords[0]},${ranchoCoords[1]}`;
}

// --- Mapa interactivo (Leaflet + OpenStreetMap): carga diferida (lazy) ---
// Ni el CSS ni el JS de Leaflet, ni las imágenes del mapa, se descargan hasta
// que el usuario esté a punto de llegar a esta sección — igual que el video,
// que tampoco descarga nada hasta que le dan play.
const mapElement = document.querySelector('#map');

if (mapElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cargarLeaflet();
        observer.unobserve(entry.target); // ya cumplió su función, se desconecta
      }
    });
  }, { rootMargin: '300px' }); // empieza a cargar un poco antes de que sea 100% visible, para que no se note el retraso

  observer.observe(mapElement);
}

function cargarLeaflet() {
  // 1. Inyecta el CSS de Leaflet
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
  document.head.appendChild(css);

  // 2. Inyecta el JS de Leaflet; cuando termine de cargar, recién ahí se dibuja el mapa
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
  script.onload = inicializarMapa;
  document.body.appendChild(script);
}

function inicializarMapa() {
  const map = L.map('map').setView(ranchoCoords, 15); // 15 = nivel de zoom inicial

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  L.marker(ranchoCoords)
    .addTo(map)
    .bindPopup('Rancho Santa Catalina')
    .openPopup();
}