import { EmptyState } from '../components/EmptyState';
import { PokemonCard } from '../components/PokemonCard';
import { useFavorites } from '../hooks/useFavorites';

export function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="page-section">
      <div className="page-title">
        <p className="eyebrow">Persistencia local</p>
        <h1>Favoritos</h1>
        <p>Los Pokémon marcados se guardan en localStorage y se mantienen al recargar.</p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="Aún no hay favoritos"
          message="Marca Pokémon desde el listado o el detalle para verlos aquí."
        />
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
