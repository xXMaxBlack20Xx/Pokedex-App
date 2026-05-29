import type { CSSProperties } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { FavoriteButton } from '../components/FavoriteButton';
import { LoadingState } from '../components/LoadingState';
import { StatBar } from '../components/StatBar';
import { toFavoritePokemon, useFavorites } from '../hooks/useFavorites';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import {
  formatHeight,
  formatPokemonName,
  formatPokemonNumber,
  formatWeight,
} from '../utils/formatting';
import { TYPE_COLORS } from '../utils/pokemon';

export function PokemonDetailPage() {
  const { idOrName } = useParams();
  const navigate = useNavigate();
  const { pokemon, isLoading, errorMessage } = usePokemonDetail(idOrName);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) return <LoadingState message="Cargando detalle del Pokémon..." />;

  if (errorMessage) {
    return (
      <div className="page-section">
        <ErrorState message={errorMessage} />
        <Link className="button button--secondary" to="/">
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!pokemon) {
    return <EmptyState title="Pokémon no encontrado" message="No existe detalle para esta ruta." />;
  }

  return (
    <section className="page-section detail-page">
      <button type="button" className="button button--secondary" onClick={() => navigate(-1)}>
        Volver
      </button>

      <article className="detail-card">
        <div className="detail-hero">
          <img src={pokemon.image} alt={formatPokemonName(pokemon.name)} />
        </div>

        <div className="detail-content">
          <div className="detail-heading">
            <div>
              <span className="pokemon-number">{formatPokemonNumber(pokemon.id)}</span>
              <h1>{formatPokemonName(pokemon.name)}</h1>
            </div>
            <FavoriteButton
              isFavorite={isFavorite(pokemon.id)}
              label={
                isFavorite(pokemon.id)
                  ? `Quitar ${pokemon.name} de favoritos`
                  : `Agregar ${pokemon.name} a favoritos`
              }
              onClick={() => toggleFavorite(toFavoritePokemon(pokemon))}
            />
          </div>

          <div className="type-list">
            {pokemon.types.map((type) => (
              <span
                key={type.name}
                className="type-badge"
                style={{ '--type-color': TYPE_COLORS[type.name] ?? '#64748b' } as CSSProperties}
              >
                {type.name}
              </span>
            ))}
          </div>

          <div className="info-grid">
            <div>
              <span>Altura</span>
              <strong>{formatHeight(pokemon.height)}</strong>
            </div>
            <div>
              <span>Peso</span>
              <strong>{formatWeight(pokemon.weight)}</strong>
            </div>
          </div>

          <section className="detail-section">
            <h2>Habilidades</h2>
            <div className="ability-list">
              {pokemon.abilities.map((ability) => (
                <span key={ability.name} className="ability-chip">
                  {formatPokemonName(ability.name)}{ability.isHidden ? ' (oculta)' : ''}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h2>Estadísticas base</h2>
            <div className="stats-stack">
              {pokemon.stats.map((stat) => (
                <StatBar key={stat.name} name={stat.name} value={stat.baseStat} />
              ))}
            </div>
          </section>
        </div>
      </article>
    </section>
  );
}
