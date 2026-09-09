import { useCarrito } from '../context/CarritoContext';

/**
 * Componente ResumenCarrito: muestra los tenis agregados al carrito,
 * permite cambiar la cantidad o eliminar un producto, y muestra el
 * total a pagar en tiempo real (se actualiza solo, gracias al Context).
 */
function Carrito() {
  const { items, eliminarProducto, actualizarCantidad, vaciarCarrito, total } = useCarrito();

  const formatearPrecio = (valor) =>
    valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  if (items.length === 0) {
    return (
      <section className="carrito-contenedor">
        <h2>Tu carrito de tenis</h2>
        <div className="carrito-vacio">
          <p>Tu carrito está vacío. ¡Agrega algunos tenis desde el catálogo!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="carrito-contenedor">
      <h2>Tu carrito de tenis</h2>

      <table className="tabla-carrito">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Talla</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.producto.id}-${item.talla}`}>
              <td className="celda-producto">
                <img src={item.producto.imagenUrl} alt={item.producto.nombre} className="miniatura" />
                <span>{item.producto.nombre}</span>
              </td>
              <td>{item.talla}</td>
              <td>{formatearPrecio(item.producto.precio)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(item.producto.id, item.talla, Number(e.target.value))
                  }
                  className="input-cantidad"
                />
              </td>
              <td>{formatearPrecio(item.producto.precio * item.cantidad)}</td>
              <td>
                <button onClick={() => eliminarProducto(item.producto.id, item.talla)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="carrito-resumen">
        <p className="total">Total: {formatearPrecio(total)}</p>
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
      </div>
    </section>
  );
}

export default Carrito;