import { useState } from 'react';
import { PRODUCTOS_EJEMPLO } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

// Listas de opciones para los filtros, calculadas una sola vez
// a partir de los datos (equivalente a un Set en Angular para valores únicos).
const MARCAS_DISPONIBLES = [...new Set(PRODUCTOS_EJEMPLO.map((p) => p.marca))];
const TIPOS_USO_DISPONIBLES = [...new Set(PRODUCTOS_EJEMPLO.map((p) => p.tipoUso))];

/**
 * Componente del catálogo de tenis: muestra la grilla de productos
 * (Componente GrillaProductos) con sus tarjetas (Componente TarjetaTenis)
 * y los filtros laterales (Componente FiltrosLaterales) por género,
 * marca, tipo de uso y talla.
 */
function Catalogo() {
  const { agregarProducto } = useCarrito();

  // Estado de los filtros. En Angular usábamos propiedades de la clase;
  // aquí cada filtro es su propio "estado" con useState.
  const [generoFiltro, setGeneroFiltro] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [tipoUsoFiltro, setTipoUsoFiltro] = useState('');

  // Guarda qué talla eligió el usuario para cada producto, antes de
  // agregarlo al carrito. La llave es el id del producto.
  const [tallasElegidas, setTallasElegidas] = useState({});

  // A diferencia de Angular (donde llamábamos aplicarFiltro() manualmente),
  // en React simplemente recalculamos el arreglo filtrado en cada render.
  const productosFiltrados = PRODUCTOS_EJEMPLO.filter((producto) => {
    const coincideGenero = generoFiltro === '' || producto.genero === generoFiltro;
    const coincideMarca = marcaFiltro === '' || producto.marca === marcaFiltro;
    const coincideTipoUso = tipoUsoFiltro === '' || producto.tipoUso === tipoUsoFiltro;
    return coincideGenero && coincideMarca && coincideTipoUso;
  });

  const seleccionarTalla = (productoId, talla) => {
    setTallasElegidas((anterior) => ({ ...anterior, [productoId]: talla }));
  };

  const manejarAgregarAlCarrito = (producto) => {
    const tallaSeleccionada = tallasElegidas[producto.id];
    if (!tallaSeleccionada) {
      alert('Por favor selecciona una talla antes de agregar al carrito.');
      return;
    }
    agregarProducto(producto, tallaSeleccionada, 1);
  };

  return (
    <section className="catalogo" id="catalogo">
      <h2>Catálogo de tenis</h2>

      {/* Componente FiltrosLaterales */}
      <div className="filtros">
        <label>
          Género:
          <select value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="Hombres">Hombres</option>
            <option value="Mujeres">Mujeres</option>
          </select>
        </label>

        <label>
          Marca:
          <select value={marcaFiltro} onChange={(e) => setMarcaFiltro(e.target.value)}>
            <option value="">Todas</option>
            {MARCAS_DISPONIBLES.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de uso:
          <select value={tipoUsoFiltro} onChange={(e) => setTipoUsoFiltro(e.target.value)}>
            <option value="">Todos</option>
            {TIPOS_USO_DISPONIBLES.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Componente GrillaProductos */}
      <div className="grilla-productos">
        {productosFiltrados.map((producto) => (
          <article key={producto.id} className="tarjeta-tenis">
            <img src={producto.imagenUrl} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="marca">{producto.marca}</p>
            <p className="calificacion">⭐ {producto.calificacion}</p>
            <p className="precio">
              {producto.precio.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
              })}
            </p>

            <label>
              Talla:
              <select
                value={tallasElegidas[producto.id] ?? ''}
                onChange={(e) => seleccionarTalla(producto.id, Number(e.target.value))}
              >
                <option value="">Selecciona</option>
                {producto.tallas.map((variante) => (
                  <option key={variante.talla} value={variante.talla}>
                    {variante.talla} ({variante.stock} disp.)
                  </option>
                ))}
              </select>
            </label>

            <button onClick={() => manejarAgregarAlCarrito(producto)}>
              Añadir al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;