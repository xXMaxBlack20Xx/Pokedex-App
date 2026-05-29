import { useEffect, useState } from 'react';
import { getPokemonTypes } from '../services/pokeApi';
import type { PokemonType } from '../types/pokemon';

export function usePokemonTypes() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTypes() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getPokemonTypes(abortController.signal);
        if (!abortController.signal.aborted) setTypes(data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(
            error instanceof Error ? error.message : 'No se pudieron cargar los tipos.',
          );
        }
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    void loadTypes();
    return () => abortController.abort();
  }, []);

  return { types, isLoading, errorMessage };
}
