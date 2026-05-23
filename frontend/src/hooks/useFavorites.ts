import { useCallback, useEffect, useState } from 'react';
import type { PokemonFavorite } from '../types/pokemon';
import {
  addFavorite as storageAddFavorite,
  getFavorites,
  isFavorite as storageIsFavorite,
  removeFavorite as storageRemoveFavorite,
} from '../storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<PokemonFavorite[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites(data);
      setLoaded(true);
    });
  }, []);

  const addFavorite = useCallback(async (pokemon: PokemonFavorite) => {
    await storageAddFavorite(pokemon);
    setFavorites((prev) => {
      if (prev.some((f) => f.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  }, []);

  const removeFavorite = useCallback(async (id: number) => {
    await storageRemoveFavorite(id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    async (pokemon: PokemonFavorite) => {
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
    loaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
