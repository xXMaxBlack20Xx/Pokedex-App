import { useCallback, useEffect, useState } from 'react';
import type { FavoritePokemon, PokemonDetail, PokemonListItem } from '../types/pokemon';
import {
  addFavorite as storageAddFavorite,
  getFavorites,
  isFavorite as storageIsFavorite,
  removeFavorite as storageRemoveFavorite,
} from '../storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addFavorite = useCallback((pokemon: FavoritePokemon) => {
    const updated = storageAddFavorite(pokemon);
    setFavorites(updated);
  }, []);

  const removeFavorite = useCallback((id: number) => {
    const updated = storageRemoveFavorite(id);
    setFavorites(updated);
  }, []);

  const toggleFavorite = useCallback(
    (pokemon: FavoritePokemon) => {
      const isFav = storageIsFavorite(pokemon.id);
      if (isFav) {
        removeFavorite(pokemon.id);
      } else {
        addFavorite(pokemon);
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
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}

export function toFavoritePokemon(pokemon: PokemonListItem | PokemonDetail): FavoritePokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
    addedAt: Date.now(),
  };
}
