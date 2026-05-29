import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { FavoritePokemon, PokemonListItem } from '../types/pokemon';
import { formatPokemonName, formatPokemonNumber } from '../utils/formatting';
import { TYPE_COLORS } from '../utils/pokemon';
import { FavoriteButton } from './FavoriteButton';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: FavoritePokemon) => void;
}

export function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: PokemonCardProps) {
  const favoriteData: FavoritePokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
    addedAt: Date.now(),
  };

  return (
    <article className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card__link">
        <div className="pokemon-card__topline">
          <span className="pokemon-number">{formatPokemonNumber(pokemon.id)}</span>
          <FavoriteButton
            isFavorite={isFavorite}
            label={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
            onClick={() => onToggleFavorite(favoriteData)}
          />
        </div>

        <h2>{formatPokemonName(pokemon.name)}</h2>

        <div className="pokemon-card__image-wrap">
          <img src={pokemon.image} alt={formatPokemonName(pokemon.name)} loading="lazy" />
        </div>

        <div className="type-list" aria-label="Tipos">
          {pokemon.types.map((type) => {
            const color = TYPE_COLORS[type.name] ?? '#64748b';
            return (
              <span
                key={type.name}
                className="type-badge"
                style={{ '--type-color': color } as CSSProperties}
              >
                {type.name}
              </span>
            );
          })}
        </div>
      </Link>
    </article>
  );
}
