import type {
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  PokemonStat,
  PokemonType,
} from '../types/pokemon';
import { getIdFromPokemonUrl, getPokemonArtworkUrl, normalizePokemonName } from '../utils/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
const detailCache = new Map<string, PokemonDetail>();

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`PokéAPI respondió con estado ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPokemonList(
  limit = 30,
  offset = 0,
  signal?: AbortSignal,
): Promise<PokemonListResponse> {
  const data = await fetchJson<PokeApiListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    signal,
  );
  const items = await Promise.all(
    data.results.map((pokemon) => getPokemonDetail(pokemon.name, signal)),
  );

  return {
    items: items.map(toListItem),
    total: data.count,
    nextOffset: data.next ? offset + limit : null,
  };
}

export async function getPokemonDetail(
  idOrName: number | string,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  const key = normalizePokemonName(String(idOrName));
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
  return data.results
    .filter((type) => !['shadow', 'unknown'].includes(type.name))
    .map((type) => ({ name: type.name, url: type.url }));
}

export async function getPokemonListByType(
  typeName: string,
  limit = 120,
  signal?: AbortSignal,
): Promise<PokemonListItem[]> {
  const data = await fetchJson<PokeApiTypeResponse>(
    `${BASE_URL}/type/${normalizePokemonName(typeName)}`,
    signal,
  );

  const unique = new Map<number, PokemonListItem>();
  for (const item of data.pokemon) {
    const id = getIdFromPokemonUrl(item.pokemon.url);
    if (!id || unique.has(id)) continue;
    unique.set(id, {
      id,
      name: item.pokemon.name,
      image: getPokemonArtworkUrl(id),
      types: [{ name: data.name }],
    });
    if (unique.size >= limit) break;
  }

  return Array.from(unique.values()).sort((a, b) => a.id - b.id);
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
  name: string;
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
