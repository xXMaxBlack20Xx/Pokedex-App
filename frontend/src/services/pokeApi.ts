const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { message?: string }).message ??
      `Error del servidor (${response.status})`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getPokemonList(
  limit = 30,
  page = 1,
  signal?: AbortSignal,
) {
  return fetchJson<import('../types/pokemon').PokemonListPage>(
    `${BASE_URL}/pokemon?limit=${limit}&page=${page}`,
    signal,
  );
}

export async function getPokemonDetail(
  idOrName: number | string,
  signal?: AbortSignal,
) {
  return fetchJson<import('../types/pokemon').PokemonDetail>(
    `${BASE_URL}/pokemon/${idOrName}`,
    signal,
  );
}

export async function getPokemonTypes(signal?: AbortSignal) {
  return fetchJson<string[]>(`${BASE_URL}/pokemon/types`, signal);
}

export async function getPokemonListByType(
  typeName: string,
  signal?: AbortSignal,
) {
  return fetchJson<import('../types/pokemon').PokemonListItem[]>(
    `${BASE_URL}/pokemon/type/${typeName}`,
    signal,
  );
}
