import type { FavoritePokemon } from '../types/pokemon';

const FAVORITES_KEY = 'pokedex:favorites';

export function getFavorites(): FavoritePokemon[] {
  try {
    const json = window.localStorage.getItem(FAVORITES_KEY);
    if (!json) return [];
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isFavoritePokemon);
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoritePokemon[]): void {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addFavorite(favorite: FavoritePokemon): FavoritePokemon[] {
  const favorites = getFavorites();
  if (favorites.some((f) => f.id === favorite.id)) return favorites;
  const updated = [...favorites, favorite].sort((a, b) => a.id - b.id);
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(id: number): FavoritePokemon[] {
  const favorites = getFavorites();
  const updated = favorites.filter((f) => f.id !== id);
  saveFavorites(updated);
  return updated;
}

export function isFavorite(id: number): boolean {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === id);
}

function isFavoritePokemon(value: unknown): value is FavoritePokemon {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<FavoritePokemon>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.image === 'string' &&
    Array.isArray(candidate.types) &&
    typeof candidate.addedAt === 'number'
  );
}
