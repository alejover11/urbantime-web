let productos = [];
let categoriaActual = "todos";

// --- 1. CONTROL DEL PRELOADER ---
window.addEventListener("load", function() {
  const loader = document.getElementById("preloader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden-loader");
    }, 500);
  }
});

// --- 2. CARGA DE DATOS (CATÁLOGO) ---
fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    crearFiltros();
    mostrarProductos();
  })
  .catch(error => console.error("Error cargando productos:", error));

function crearFiltros() {
  const contenedorFiltros = document.getElementById("filtros");
  if(!contenedorFiltros) return;
  
  const categorias = [...new Set(productos.map(p => p.categoria))];

  contenedorFiltros.innerHTML = `
    <button id="btn-todos" class="active" onclick="filtrar('todos', this)">Todos</button>
    ${categorias.map(cat =>
      `<button onclick="filtrar('${cat}', this)">
        ${formatearCategoria(cat)}
      </button>`
    ).join("")}
  `;
}

function filtrar(categoria, elemento) {
  categoriaActual = categoria;
  const botones = document.querySelectorAll(".filtros button");
  botones.forEach(btn => btn.classList.remove("active"));
  elemento.classList.add("active");
  mostrarProductos();
}

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  if(!contenedor) return;

  let filtrados = categoriaActual === "todos"
    ? productos
    : productos.filter(p => p.categoria === categoriaActual);

  contenedor.innerHTML = filtrados.map(producto => {
    const mensaje = `Hola, estoy interesado en la ${producto.nombre} referencia ${producto.referencia}`;
    const linkWhatsApp = `https://wa.me/573017399372?text=${encodeURIComponent(mensaje)}`;

    return `
      <div class="card">
        <div class="img-container" style="overflow:hidden; border-radius:4px;">
           <img src="${producto.imagen}" alt="${producto.nombre}" style="transition: transform 0.5s ease; width: 100%; display: block;">
        </div>
        <h3 style="margin-top:15px; font-size:18px;">${producto.nombre}</h3>
        <p class="price">$${producto.precio.toLocaleString()}</p> 
        <p style="color: #666; font-size: 12px; margin-bottom: 15px;">Ref: ${producto.referencia}</p>
        <a href="${linkWhatsApp}" target="_blank" class="whatsapp">
          Pedir por WhatsApp
        </a>
      </div>
    `;
  }).join("");

  animarCards();
}

// --- 3. ANIMACIONES DE APARICIÓN ---
function animarCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
}

function formatearCategoria(categoria) {
  return categoria.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

// --- 4. SLIDERS (INICIO AL CARGAR DOM) ---
document.addEventListener("DOMContentLoaded", function () {
  
  // A. Slider "Sobre Nosotros" (Pequeño)
  const aboutSlides = document.querySelectorAll(".about-slide");
  if (aboutSlides.length > 0) {
    let aboutIndex = 0;
    setInterval(() => {
      aboutSlides[aboutIndex].classList.remove("active");
      aboutIndex = (aboutIndex + 1) % aboutSlides.length;
      aboutSlides[aboutIndex].classList.add("active");
    }, 4000);
  }

  // B. NUEVO: Slider Editorial Dinámico (Propósito + Vintage)
  const editorialSlides = document.querySelectorAll('.edit-slide');
  const sliderTitle = document.getElementById('slider-title');
  const sliderDesc = document.getElementById('slider-desc');
  
  if (editorialSlides.length > 0) {
    let editIndex = 0;
    const contenidos = [
      {
        titulo: "LA VIDA ES UN ESPEJO",
        desc: "Sé amable, el estilo real viene de adentro. Refleja tu mejor versión con Urban Time."
      },
      {
        titulo: "VINTAGE VIBES",
        desc: "Nuestra esencia clásica capturada en texturas únicas. Únete al crew más real de Sincelejo."
      }
    ];

    setInterval(() => {
      // Cambiar imagen
      editorialSlides[editIndex].classList.remove('active');
      editIndex = (editIndex + 1) % editorialSlides.length;
      editorialSlides[editIndex].classList.add('active');

      // Cambiar texto con efecto de desvanecimiento
      if (sliderTitle && sliderDesc) {
        sliderTitle.style.opacity = 0;
        sliderDesc.style.opacity = 0;

        setTimeout(() => {
          sliderTitle.innerText = contenidos[editIndex].titulo;
          sliderDesc.innerText = contenidos[editIndex].desc;
          sliderTitle.style.opacity = 1;
          sliderDesc.style.opacity = 1;
        }, 600);
      }
    }, 5000); // Cambia cada 5 segundos
  }
});