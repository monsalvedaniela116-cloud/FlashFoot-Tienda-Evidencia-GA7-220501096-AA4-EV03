import { useCarrito } from '../context/CarritoContext';

function Navbar() {
  const { cantidadTotalItems } = useCarrito();

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>
          ⚡ Flash<span className="acento">Foot</span>
        </h1>
      </div>

      <nav className="navbar-links" aria-label="Navegación principal del sitio">
        <a href="#catalogo">Hombres</a>
        <a href="#catalogo">Mujeres</a>
        <a href="#catalogo">Lo nuevo</a>
        <a href="#catalogo" className="outlet">
          Outlet
        </a>
      </nav>

      <div className="navbar-iconos">
        <button aria-label="Buscar" type="button">🔍</button>
        <button aria-label="Mi cuenta" type="button">👤</button>
        <button aria-label="Favoritos" type="button">🤍</button>
        <a href="#carrito" aria-label="Carrito de compras" className="icono-carrito">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cantidadTotalItems > 0 && (
            <span className="badge-carrito">{cantidadTotalItems}</span>
          )}
        </a>
      </div>
    </header>
  );
}

export default Navbar;