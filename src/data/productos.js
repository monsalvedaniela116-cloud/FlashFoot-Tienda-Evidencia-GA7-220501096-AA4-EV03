/**
 * @typedef {Object} VarianteTalla
 * @property {number} talla
 * @property {number} stock
 */

/**
 * @typedef {Object} Producto
 * @property {number} id
 * @property {string} nombre
 * @property {string} marca - Ej: 'Nike', 'Adidas', 'Puma'
 * @property {'Hombres'|'Mujeres'} genero
 * @property {'Running'|'Casual'|'Urbano'} tipoUso
 * @property {number} precio
 * @property {string} imagenUrl
 * @property {number} calificacion - Valoración en estrellas (0 a 5)
 * @property {VarianteTalla[]} tallas - Cada talla disponible con su propio stock
 */

/**
 * Catálogo de productos de ejemplo para FlashFoot.
 * Las imágenes son fotos gratuitas de Unsplash (licencia libre, sin
 * derechos de autor), usadas aquí solo con fines demostrativos/académicos.
 * @type {Producto[]}
 */
export const PRODUCTOS_EJEMPLO = [
  {
    id: 1,
    nombre: 'Air Max 270',
    marca: 'Nike',
    genero: 'Hombres',
    tipoUso: 'Running',
    precio: 450000,
    imagenUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.5,
    tallas: [
      { talla: 40, stock: 15 },
      { talla: 41, stock: 10 },
      { talla: 42, stock: 8 },
    ],
  },
  {
    id: 2,
    nombre: 'Ultraboost',
    marca: 'Adidas',
    genero: 'Mujeres',
    tipoUso: 'Running',
    precio: 480000,
    imagenUrl: 'https://images.unsplash.com/photo-1542272604-78d13c1f741a?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.7,
    tallas: [
      { talla: 36, stock: 12 },
      { talla: 37, stock: 9 },
      { talla: 38, stock: 5 },
    ],
  },
  {
    id: 3,
    nombre: 'Suede Classic',
    marca: 'Puma',
    genero: 'Hombres',
    tipoUso: 'Casual',
    precio: 250000,
    imagenUrl: 'https://images.unsplash.com/photo-1654130491481-dc83a0a05e4e?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.2,
    tallas: [
      { talla: 40, stock: 20 },
      { talla: 41, stock: 18 },
      { talla: 42, stock: 14 },
    ],
  },
  {
    id: 4,
    nombre: 'Air Force 1',
    marca: 'Nike',
    genero: 'Mujeres',
    tipoUso: 'Urbano',
    precio: 380000,
    imagenUrl: 'https://images.unsplash.com/photo-1698440235228-9c617924c06e?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.8,
    tallas: [
      { talla: 36, stock: 10 },
      { talla: 37, stock: 7 },
      { talla: 38, stock: 6 },
    ],
  },
  {
    id: 5,
    nombre: 'Forum Low',
    marca: 'Adidas',
    genero: 'Hombres',
    tipoUso: 'Urbano',
    precio: 380000,
    imagenUrl: 'https://images.unsplash.com/photo-1615743472612-93b21e520fad?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.3,
    tallas: [
      { talla: 40, stock: 11 },
      { talla: 41, stock: 9 },
    ],
  },
  {
    id: 6,
    nombre: 'RS-X',
    marca: 'Puma',
    genero: 'Mujeres',
    tipoUso: 'Casual',
    precio: 320000,
    imagenUrl: 'https://images.unsplash.com/photo-1651603837241-e25915f7ca26?auto=format&fit=crop&w=600&q=80',
    calificacion: 4.4,
    tallas: [
      { talla: 36, stock: 13 },
      { talla: 37, stock: 10 },
      { talla: 38, stock: 8 },
    ],
  },
];