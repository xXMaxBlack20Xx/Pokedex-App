import type {
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  PokemonStat,
  PokemonType,
} from '../types/pokemon';
import { getPokemonArtworkUrl, normalizePokemonName } from '../utils/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
const REQUEST_TIMEOUT_MS = 10000;
const detailCache = new Map<string, PokemonDetail>();

export async function getPokemonList(
  limit = 30,
  offset = 0,
  signal?: AbortSignal,
): Promise<PokemonListResponse> {
  const data = await fetchJson<PokeApiListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    signal,
  );

  if (!Array.isArray(data.results)) {
    throw new Error('La respuesta de listado de PokeAPI no es valida.');
  }

  const details = await Promise.all(data.results.map((pokemon) => getPokemonDetail(pokemon.name, signal)));

  return {
    items: details.map(toListItem),
    total: data.count,
    nextOffset: data.next ? offset + limit : null,
  };
}

export async function getPokemonDetail(
  nameOrId: string | number,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  const key = normalizePokemonName(String(nameOrId));
  const cached = detailCache.get(key);
  if (cached) return cached;

  const data = await fetchJson<PokeApiPokemon>(`${BASE_URL}/pokemon/${key}`, signal);
  const detail = mapPokemonDetail(data);

  detailCache.set(String(detail.id), detail);
  detailCache.set(detail.name, detail);

  return detail;
}

export async function getPokemonTypes(signal?: AbortSignal): Promise<PokemonType[]> {
  const data = await fetchJson<PokeApiListResponse>(`${BASE_URL}/type`, signal);

  if (!Array.isArray(data.results)) {
    throw new Error('La respuesta de tipos de PokeAPI no es valida.');
  }

  return data.results
    .filter((type) => !['shadow', 'unknown'].includes(type.name))
    .map((type) => ({ name: type.name, url: type.url }));
}

export async function getPokemonByType(
  typeName: string,
  limit = 120,
  signal?: AbortSignal,
): Promise<PokemonListItem[]> {
  const normalizedType = normalizePokemonName(typeName);
  const data = await fetchJson<PokeApiTypeResponse>(`${BASE_URL}/type/${normalizedType}`, signal);

  if (!Array.isArray(data.pokemon)) {
    throw new Error('La respuesta de Pokemon por tipo no es valida.');
  }

  const names = data.pokemon.slice(0, limit).map((item) => item.pokemon.name);
  const details = await Promise.all(names.map((name) => getPokemonDetail(name, signal)));

  return details.map(toListItem).sort((a, b) => a.id - b.id);
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const abortFromCaller = () => controller.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`PokeAPI respondio con estado ${response.status}.`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('La solicitud a PokeAPI tardo demasiado o fue cancelada.');
    }

    throw error instanceof Error ? error : new Error('No se pudo consultar PokeAPI.');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}

function toListItem(detail: PokemonDetail): PokemonListItem {
  return {
    id: detail.id,
    name: detail.name,
    image: detail.image,
    types: detail.types,
  };
}

function mapPokemonDetail(data: PokeApiPokemon): PokemonDetail {
  if (!data.id || !data.name || !Array.isArray(data.types) || !Array.isArray(data.stats)) {
    throw new Error('La respuesta de detalle de PokeAPI no es valida.');
  }

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other['official-artwork'].front_default ??
      data.sprites.front_default ??
      getPokemonArtworkUrl(data.id),
    types: data.types.map((item) => ({ name: item.type.name, url: item.type.url })),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((item) => ({
      name: item.ability.name,
      isHidden: item.is_hidden,
    })),
    stats: data.stats.map((item): PokemonStat => ({
      name: item.stat.name,
      baseStat: item.base_stat,
    })),
  };
}

interface NamedApiResource {
  name: string;
  url: string;
}

interface PokeApiListResponse {
  count: number;
  next: string | null;
  results: NamedApiResource[];
}

interface PokeApiTypeResponse {
  pokemon: Array<{ pokemon: NamedApiResource }>;
}

interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  types: Array<{ type: NamedApiResource }>;
  abilities: Array<{ ability: NamedApiResource; is_hidden: boolean }>;
  stats: Array<{ base_stat: number; stat: NamedApiResource }>;
}
