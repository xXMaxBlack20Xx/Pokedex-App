import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PokemonFavorite } from '../types/pokemon';

const FAVORITES_KEY = '@pokedex_favorites';

export async function getFavorites(): Promise<PokemonFavorite[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!json) return [];
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed as PokemonFavorite[];
  } catch {
    return [];
  }
}

export async function addFavorite(favorite: PokemonFavorite): Promise<void> {
  const favorites = await getFavorites();
  if (favorites.some((f) => f.id === favorite.id)) return;
  favorites.push(favorite);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function removeFavorite(id: number): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((f) => f.id !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function isFavorite(id: number): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.id === id);
}
