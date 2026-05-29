import type { FavoritePokemon, PokemonDetail, PokemonListItem } from '../types/pokemon';

export const requiredStatOrder = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
] as const;

export function normalizePokemonName(name: string): string {
  return name.trim().toLowerCase();
}

export function matchesPokemonSearch(name: string, query: string): boolean {
  const normalizedQuery = normalizePokemonName(query);
  return !normalizedQuery || normalizePokemonName(name).includes(normalizedQuery);
}

export function getIdFromPokemonUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) return null;

  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function toFavoritePokemon(pokemon: PokemonDetail | PokemonListItem): FavoritePokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
    addedAt: Date.now(),
  };
}
