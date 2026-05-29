import { useEffect, useMemo, useState } from 'react';
import { getPokemonByType, getPokemonList } from '../services/pokeApi';
import type { PokemonListItem } from '../types/pokemon';
import { matchesPokemonSearch, normalizePokemonName } from '../utils/pokemon';

const PAGE_SIZE = 30;

export function usePokemonList(searchQuery: string, selectedType: string) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadInitialPokemon() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const normalizedType = normalizePokemonName(selectedType);
        if (normalizedType) {
          const items = await getPokemonByType(normalizedType, 120, abortController.signal);
          setPokemon(items);
          setNextOffset(null);
        } else {
          const response = await getPokemonList(PAGE_SIZE, 0, abortController.signal);
          setPokemon(response.items);
          setNextOffset(response.nextOffset);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(
            error instanceof Error ? error.message : 'No se pudo cargar la Pokédex.',
          );
          setPokemon([]);
          setNextOffset(null);
        }
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    void loadInitialPokemon();
    return () => abortController.abort();
  }, [selectedType]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((item) => matchesPokemonSearch(item.name, searchQuery));
  }, [pokemon, searchQuery]);

  async function loadMore() {
    if (nextOffset === null || isLoadingMore || selectedType) return;

    try {
      setIsLoadingMore(true);
      setErrorMessage(null);
      const response = await getPokemonList(PAGE_SIZE, nextOffset);
      setPokemon((current) => [...current, ...response.items]);
      setNextOffset(response.nextOffset);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudieron cargar más Pokémon.',
      );
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function refresh() {
    const normalizedType = normalizePokemonName(selectedType);
    setErrorMessage(null);

    if (normalizedType) {
      const items = await getPokemonByType(normalizedType, 120);
      setPokemon(items);
      setNextOffset(null);
      return;
    }

    const response = await getPokemonList(PAGE_SIZE, 0);
    setPokemon(response.items);
    setNextOffset(response.nextOffset);
  }

  return {
    pokemon,
    filteredPokemon,
    isLoading,
    isLoadingMore,
    errorMessage,
    canLoadMore: nextOffset !== null && !selectedType,
    loadMore,
    refresh,
  };
}
