import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { FavoritePokemon, PokemonDetail, PokemonListItem } from '../types/pokemon';
import {
  addFavorite as storageAddFavorite,
  getFavorites,
  isFavorite as storageIsFavorite,
  removeFavorite as storageRemoveFavorite,
} from '../storage/favoritesStorage';
import { toFavoritePokemon as mapToFavoritePokemon } from '../utils/pokemon';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reloadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      setFavorites(await getFavorites());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudieron cargar los favoritos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void reloadFavorites();
    }, [reloadFavorites]),
  );

  const addFavorite = useCallback(async (pokemon: FavoritePokemon) => {
    try {
      setErrorMessage(null);
      setFavorites(await storageAddFavorite(pokemon));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo agregar favorito.');
    }
  }, []);

  const removeFavorite = useCallback(async (id: number) => {
    try {
      setErrorMessage(null);
      setFavorites(await storageRemoveFavorite(id));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo quitar favorito.');
    }
  }, []);

  const toggleFavorite = useCallback(
    async (pokemon: FavoritePokemon) => {
      const isFav = await storageIsFavorite(pokemon.id);
      if (isFav) {
        await removeFavorite(pokemon.id);
      } else {
        await addFavorite(pokemon);
      }
    },
    [addFavorite, removeFavorite],
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  );

  return {
    favorites,
    isLoading,
    errorMessage,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    reloadFavorites,
  };
}

export function toFavoritePokemon(pokemon: PokemonListItem | PokemonDetail): FavoritePokemon {
  return mapToFavoritePokemon(pokemon);
}
