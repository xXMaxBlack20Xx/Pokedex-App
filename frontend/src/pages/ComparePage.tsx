import { useState } from 'react';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { usePokemonList } from '../hooks/usePokemonList';
import { formatPokemonName, formatStatName } from '../utils/formatting';
import { REQUIRED_STAT_ORDER } from '../utils/pokemon';

export function ComparePage() {
  const { pokemon, isLoading, errorMessage, canLoadMore, isLoadingMore, loadMore } =
    usePokemonList('', '');
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');
  const first = usePokemonDetail(firstId || undefined);
  const second = usePokemonDetail(secondId || undefined);
  const firstPokemon = first.pokemon;
  const secondPokemon = second.pokemon;
  const isSamePokemon = firstId !== '' && firstId === secondId;
  const canCompare = firstPokemon && secondPokemon && !isSamePokemon;

  return (
    <section className="page-section">
      <div className="page-title">
        <p className="eyebrow">Comparador</p>
        <h1>Compara estadísticas base</h1>
        <p>Selecciona dos Pokémon diferentes para ver quién domina cada estadística.</p>
      </div>

      {errorMessage ? <ErrorState message={errorMessage} /> : null}
      {isLoading ? <LoadingState message="Preparando opciones de comparación..." /> : null}

      {!isLoading ? (
        <div className="compare-panel">
          <div className="compare-selectors">
            <label className="field">
              Pokémon A
              <select value={firstId} onChange={(event) => setFirstId(event.target.value)}>
                <option value="">Selecciona un Pokémon</option>
                {pokemon.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {formatPokemonName(item.name)}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              Pokémon B
              <select value={secondId} onChange={(event) => setSecondId(event.target.value)}>
                <option value="">Selecciona un Pokémon</option>
                {pokemon.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {formatPokemonName(item.name)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {canLoadMore ? (
            <button
              type="button"
              className="button button--secondary"
              onClick={() => void loadMore()}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Cargando...' : 'Cargar más opciones'}
            </button>
          ) : null}

          {!firstId || !secondId ? (
            <p className="helper-text">Selecciona ambos Pokémon para comparar.</p>
          ) : null}
          {isSamePokemon ? (
            <p className="warning-text">No se puede comparar un Pokémon consigo mismo.</p>
          ) : null}
          {(firstId && first.errorMessage) || (secondId && second.errorMessage) ? (
            <ErrorState message={first.errorMessage ?? second.errorMessage ?? undefined} />
          ) : null}
          {(first.isLoading || second.isLoading) && firstId && secondId ? (
            <LoadingState message="Cargando estadísticas..." />
          ) : null}

          {canCompare ? (
            <div className="comparison-table" role="table" aria-label="Comparación de estadísticas">
              <div className="comparison-row comparison-row--head" role="row">
                <strong>{formatPokemonName(firstPokemon.name)}</strong>
                <strong>Estadística</strong>
                <strong>{formatPokemonName(secondPokemon.name)}</strong>
              </div>
              {REQUIRED_STAT_ORDER.map((statName) => {
                const firstValue = firstPokemon.stats.find((stat) => stat.name === statName)?.baseStat ?? 0;
                const secondValue = secondPokemon.stats.find((stat) => stat.name === statName)?.baseStat ?? 0;
                return (
                  <div className="comparison-row" role="row" key={statName}>
                    <span className={firstValue > secondValue ? 'winner' : ''}>{firstValue}</span>
                    <span>{formatStatName(statName)}</span>
                    <span className={secondValue > firstValue ? 'winner' : ''}>{secondValue}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
