import './App.css';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';

function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <main>
        <Catalogo />
        <Carrito />
      </main>
    </CarritoProvider>
  );
}

export default App;