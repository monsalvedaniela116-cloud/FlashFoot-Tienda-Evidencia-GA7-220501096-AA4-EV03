import { createContext, useContext, useReducer } from 'react';

/**
 * Contexto de React para el carrito de compras.
 * Es el equivalente a `CarritoService` en Angular: un lugar central
 * donde se guarda el estado del carrito y que cualquier componente
 * puede leer o modificar sin pasar props manualmente de padre a hijo.
 */
const CarritoContext = createContext(null);

// Estado inicial: el carrito empieza vacío.
const estadoInicial = {
  items: [], // Cada item: { producto, talla, cantidad }
};

/**
 * Reducer del carrito: única función que decide cómo cambia el estado
 * según la acción recibida. Es el equivalente a los métodos que tenía
 * CarritoService (agregarProducto, eliminarProducto, etc.), pero
 * centralizados en un solo lugar, como pide el patrón de React.
 */
function carritoReducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_PRODUCTO': {
      const { producto, talla, cantidad } = accion.payload;

      // Buscamos si ya existe ese mismo producto con la misma talla
      const indiceExistente = estado.items.findIndex(
        (item) => item.producto.id === producto.id && item.talla === talla
      );

      if (indiceExistente !== -1) {
        // Ya existe: solo aumentamos la cantidad de esa línea
        const nuevosItems = [...estado.items];
        nuevosItems[indiceExistente] = {
          ...nuevosItems[indiceExistente],
          cantidad: nuevosItems[indiceExistente].cantidad + cantidad,
        };
        return { ...estado, items: nuevosItems };
      }

      // No existe: la agregamos como una línea nueva
      return {
        ...estado,
        items: [...estado.items, { producto, talla, cantidad }],
      };
    }

    case 'ELIMINAR_PRODUCTO': {
      const { productoId, talla } = accion.payload;
      return {
        ...estado,
        items: estado.items.filter(
          (item) => !(item.producto.id === productoId && item.talla === talla)
        ),
      };
    }

    case 'ACTUALIZAR_CANTIDAD': {
      const { productoId, talla, nuevaCantidad } = accion.payload;

      // Si la nueva cantidad es 0 o menos, eliminamos la línea directamente
      if (nuevaCantidad <= 0) {
        return {
          ...estado,
          items: estado.items.filter(
            (item) => !(item.producto.id === productoId && item.talla === talla)
          ),
        };
      }

      return {
        ...estado,
        items: estado.items.map((item) =>
          item.producto.id === productoId && item.talla === talla
            ? { ...item, cantidad: nuevaCantidad }
            : item
        ),
      };
    }

    case 'VACIAR_CARRITO':
      return { ...estado, items: [] };

    default:
      return estado;
  }
}

/**
 * Proveedor del carrito. Envuelve la aplicación (o la parte que lo necesite)
 * y comparte el estado del carrito con todos sus componentes hijos.
 */
export function CarritoProvider({ children }) {
  const [estado, dispatch] = useReducer(carritoReducer, estadoInicial);

  // Funciones "amigables" que envuelven el dispatch, para que los
  // componentes no tengan que conocer los nombres exactos de las acciones
  // (esto imita la API que tenía CarritoService).
  const agregarProducto = (producto, talla, cantidad = 1) => {
    dispatch({ type: 'AGREGAR_PRODUCTO', payload: { producto, talla, cantidad } });
  };

  const eliminarProducto = (productoId, talla) => {
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: { productoId, talla } });
  };

  const actualizarCantidad = (productoId, talla, nuevaCantidad) => {
    dispatch({ type: 'ACTUALIZAR_CANTIDAD', payload: { productoId, talla, nuevaCantidad } });
  };

  const vaciarCarrito = () => {
    dispatch({ type: 'VACIAR_CARRITO' });
  };

  // Valores calculados a partir del estado (equivalentes a
  // obtenerTotal() y obtenerCantidadTotalItems() de CarritoService).
  const total = estado.items.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0
  );

  const cantidadTotalItems = estado.items.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );

  const valor = {
    items: estado.items,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    total,
    cantidadTotalItems,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

/**
 * Hook personalizado para consumir el carrito.
 * Uso: const { items, agregarProducto, total } = useCarrito();
 * Es el equivalente a inyectar CarritoService en el constructor en Angular.
 */
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un <CarritoProvider>');
  }
  return contexto;
}