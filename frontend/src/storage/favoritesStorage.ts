import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FavoritePokemon } from '../types/pokemon';

const FAVORITES_KEY = '@pokedex_mobile:favorites';

export async function getFavorites(): Promise<FavoritePokemon[]> {
  try {
    const rawFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!rawFavorites) return [];

    const favorites = JSON.parse(rawFavorites) as unknown;
    if (!Array.isArray(favorites)) return [];

    return favorites.filter(isFavoritePokemon).sort((a, b) => a.id - b.id);
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: FavoritePokemon[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    throw new Error('No se pudieron guardar los favoritos.');
  }
}

export async function addFavorite(pokemon: FavoritePokemon): Promise<FavoritePokemon[]> {
  const favorites = await getFavorites();
  const exists = favorites.some((favorite) => favorite.id === pokemon.id);
  const nextFavorites = exists ? favorites : [...favorites, pokemon].sort((a, b) => a.id - b.id);

  await saveFavorites(nextFavorites);
  return nextFavorites;
}

export async function removeFavorite(id: number): Promise<FavoritePokemon[]> {
  const favorites = await getFavorites();
  const nextFavorites = favorites.filter((favorite) => favorite.id !== id);

  await saveFavorites(nextFavorites);
  return nextFavorites;
}

export async function isFavorite(id: number): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((favorite) => favorite.id === id);
}

function isFavoritePokemon(value: unknown): value is FavoritePokemon {
  if (!value || typeof value !== 'object') return false;

  const favorite = value as Partial<FavoritePokemon>;
  return (
    typeof favorite.id === 'number' &&
    typeof favorite.name === 'string' &&
    typeof favorite.image === 'string' &&
    Array.isArray(favorite.types) &&
    typeof favorite.addedAt === 'number'
  );
}
