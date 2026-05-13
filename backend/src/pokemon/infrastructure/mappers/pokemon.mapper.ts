import { Pokemon } from '../../domain/models/pokemon.model';
import { PokeApiPokemonDetailResponse } from '../pokeapi/pokeapi.types';

export function mapPokeApiPokemonToPokemon(
  rawPokemon: PokeApiPokemonDetailResponse,
): Pokemon {
  const id = Number(rawPokemon.id);
  const name = String(rawPokemon.name ?? '')
    .trim()
    .toLowerCase();
  const types = rawPokemon.types
    .map((entry) =>
      String(entry.type.name ?? '')
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean);

  if (!Number.isInteger(id) || id <= 0 || !name || types.length === 0) {
    throw new Error('Respuesta invalida de PokeAPI');
  }

  const image =
    rawPokemon.sprites?.other?.['official-artwork']?.front_default ??
    rawPokemon.sprites?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return {
    id,
    name,
    image,
    types,
  };
}
