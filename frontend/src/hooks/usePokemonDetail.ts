import { useEffect, useState } from 'react';
import { getPokemonDetail } from '../services/pokeApi';
import type { PokemonDetail } from '../types/pokemon';

export function usePokemonDetail(idOrName: string | undefined) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrName) {
      setPokemon(null);
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    const requestedPokemon = idOrName;

    const abortController = new AbortController();

    async function loadPokemonDetail() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const detail = await getPokemonDetail(requestedPokemon, abortController.signal);
        if (!abortController.signal.aborted) setPokemon(detail);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setPokemon(null);
          setErrorMessage(
            error instanceof Error ? error.message : 'No se pudo cargar el detalle.',
          );
        }
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    void loadPokemonDetail();
    return () => abortController.abort();
  }, [idOrName]);

  return { pokemon, isLoading, errorMessage };
}
