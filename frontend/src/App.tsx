import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ComparePage } from './pages/ComparePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <NavLink className="brand" to="/" aria-label="Ir al inicio">
          <span className="brand-mark" aria-hidden="true" />
          <span>Pokédex</span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
          <NavLink to="/comparar">Comparar</NavLink>
        </nav>
      </header>

      <main className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:idOrName" element={<PokemonDetailPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/comparar" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
