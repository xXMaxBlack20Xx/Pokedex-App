import { useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { useFavorites } from '../hooks/useFavorites';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonTypes } from '../hooks/usePokemonTypes';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { types, isLoading: isLoadingTypes } = usePokemonTypes();
  const {
    filteredPokemon,
    isLoading,
    isLoadingMore,
    errorMessage,
    canLoadMore,
    loadMore,
  } = usePokemonList(searchQuery, selectedType);

  const hasFilters = searchQuery.trim() || selectedType;

  return (
    <section className="page-section">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">PokéAPI REST</p>
          <h1>Explora Pokémon, guarda favoritos y compara estadísticas.</h1>
          <p>
            Listado inicial de 30 Pokémon con búsqueda, filtros por tipo y tarjetas listas
            para navegar al detalle.
          </p>
        </div>
        <div className="hero-metric" aria-label="Favoritos guardados">
          <strong>{favorites.length}</strong>
          <span>favoritos</span>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          isLoading={isLoadingTypes}
        />
      </div>

      {errorMessage ? <ErrorState message={errorMessage} /> : null}
      {isLoading ? <LoadingState /> : null}

      {!isLoading && !errorMessage && filteredPokemon.length === 0 ? (
        <EmptyState
          message={
            hasFilters
              ? 'No hay coincidencias para la búsqueda y filtros seleccionados.'
              : 'No hay Pokémon disponibles en este momento.'
          }
        />
      ) : null}

      {!isLoading && filteredPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : null}

      {canLoadMore && !isLoading && !errorMessage ? (
        <div className="load-more-wrap">
          <button
            type="button"
            className="button"
            onClick={() => void loadMore()}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Cargando...' : 'Cargar más'}
          </button>
        </div>
      ) : null}
    </section>
  );
}
