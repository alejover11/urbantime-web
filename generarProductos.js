const fs = require("fs");
const path = require("path");

const carpetaImg = "./img";
let productos = [];

fs.readdirSync(carpetaImg).forEach(categoria => {
  const rutaCategoria = path.join(carpetaImg, categoria);

  if (fs.lstatSync(rutaCategoria).isDirectory()) {
    const imagenes = fs.readdirSync(rutaCategoria);

    imagenes.forEach((imagen, index) => {
      productos.push({
        nombre: formatearNombre(categoria, imagen),
        precio: 0,
        referencia: generarReferencia(categoria, index),
        categoria: categoria,
        imagen: `img/${categoria}/${imagen}`
      });
    });
  }
});

function formatearNombre(categoria, imagen) {
  const nombreBase = imagen.split(".")[0].replace(/-/g, " ");
  return nombreBase.charAt(0).toUpperCase() + nombreBase.slice(1);
}

function generarReferencia(categoria, index) {
  return categoria.toUpperCase().replace(/-/g, "") + (index + 1);
}

fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2));

console.log("✅ productos.json generado automáticamente");
