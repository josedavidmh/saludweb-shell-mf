/** @type {import('next').NextConfig} */

// Nombre EXACTO del repositorio de GitHub (usado como basePath en producción,
// porque GitHub Pages de proyecto sirve el sitio en usuario.github.io/REPO/).
// Si tu Pages es de tipo "usuario.github.io" (repo raíz), deja NOMBRE_REPO = "".
const NOMBRE_REPO = "saludweb-prototipo-flux";

const enProduccion = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // genera HTML/CSS/JS estático en /out (requisito de GitHub Pages)
  trailingSlash: true, // cada ruta queda como /agenda/index.html (evita 404 al recargar)
  images: { unoptimized: true }, // GitHub Pages no tiene el optimizador de imágenes de Next
  basePath: enProduccion && NOMBRE_REPO ? `/${NOMBRE_REPO}` : "",
  assetPrefix: enProduccion && NOMBRE_REPO ? `/${NOMBRE_REPO}/` : "",
};

module.exports = nextConfig;
