import { Pokemon, PokemonDetail } from '../../domain/models/pokemon.model';
import { PokeApiPokemonDetailResponse } from '../pokeapi/pokeapi.types';

function getImageUrl(
  rawPokemon: PokeApiPokemonDetailResponse,
  id: number,
): string {
  return (
    rawPokemon.sprites?.other?.['official-artwork']?.front_default ??
    rawPokemon.sprites?.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  );
}

function getTypes(rawPokemon: PokeApiPokemonDetailResponse): string[] {
  return rawPokemon.types
    .map((entry) =>
      String(entry.type.name ?? '')
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean);
}

function validate(
  id: number,
  name: string,
  types: string[],
): void {
  if (!Number.isInteger(id) || id <= 0 || !name || types.length === 0) {
    throw new Error('Respuesta invalida de PokeAPI');
  }
}

export function mapPokeApiPokemonToPokemon(
  rawPokemon: PokeApiPokemonDetailResponse,
): Pokemon {
  const id = Number(rawPokemon.id);
  const name = String(rawPokemon.name ?? '').trim().toLowerCase();
  const types = getTypes(rawPokemon);

  validate(id, name, types);

  return {
    id,
    name,
    image: getImageUrl(rawPokemon, id),
    types,
  };
}

export function mapPokeApiPokemonToPokemonDetail(
  rawPokemon: PokeApiPokemonDetailResponse,
): PokemonDetail {
  const id = Number(rawPokemon.id);
  const name = String(rawPokemon.name ?? '').trim().toLowerCase();
  const types = getTypes(rawPokemon);

  validate(id, name, types);

  return {
    id,
    name,
    image: getImageUrl(rawPokemon, id),
    types,
    height: rawPokemon.height,
    weight: rawPokemon.weight,
    stats: rawPokemon.stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    })),
    abilities: rawPokemon.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
  };
}
