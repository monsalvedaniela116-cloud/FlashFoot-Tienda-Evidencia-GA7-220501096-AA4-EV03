import './App.css';
import { CarritoProvider } from './context/CarritoContext';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';

/**
 * Componente raíz de la aplicación FlashFoot.
 * Envolvemos todo en <CarritoProvider> para que tanto el catálogo
 * como el carrito puedan compartir el mismo estado del carrito de compras.
 */
function App() {
  return (
    <CarritoProvider>
      <header className="cabecera">
        <h1>
          ⚡ Flash<span className="acento">Foot</span>
        </h1>
      </header>
      <main>
        <Catalogo />
        <Carrito />
      </main>
    </CarritoProvider>
  );
}

export default App;