import { PokemonListPage } from '../types/pokemon';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

export async function getPokemonList(
  page = 1,
  limit = 20,
  signal?: AbortSignal,
): Promise<PokemonListPage> {
  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, '')}/pokemon?page=${page}&limit=${limit}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('No se pudo cargar el listado de Pokémon.');
  }

  return (await response.json()) as PokemonListPage;
}
