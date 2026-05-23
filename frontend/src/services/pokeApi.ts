const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokeApiListItem {
  name: string;
  url: string;
}

interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiListItem[];
}

interface PokeApiSprite {
  front_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
    };
  };
}

interface PokeApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokeApiAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokeApiPokemonDetail {
  id: number;
  name: string;
  sprites: PokeApiSprite;
  types: PokeApiType[];
  stats: PokeApiStat[];
  abilities: PokeApiAbility[];
  height: number;
  weight: number;
}

interface PokeApiTypeDetail {
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

import type {
  PokemonListItem,
  PokemonListPage,
  PokemonDetail,
  PokemonTypeListItem,
  PokemonTypeDetail,
} from '../types/pokemon';

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

function getImageUrl(sprites: PokeApiSprite): string {
  return (
    sprites.other['official-artwork'].front_default ??
    sprites.front_default ??
    ''
  );
}

export async function getPokemonList(
  limit = 30,
  offset = 0,
  signal?: AbortSignal,
): Promise<PokemonListPage> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error('No se pudo cargar el listado de Pokémon.');
  }

  const data: PokeApiListResponse = await response.json();

  const detailPromises = data.results.map((item) =>
    fetch(item.url, { signal }).then((res) => {
      if (!res.ok) throw new Error(`Error al cargar ${item.name}`);
      return res.json() as Promise<PokeApiPokemonDetail>;
    }),
  );

  const details = await Promise.all(detailPromises);

  const items: PokemonListItem[] = details.map((detail) => ({
    id: detail.id,
    name: detail.name,
    image: getImageUrl(detail.sprites),
    types: detail.types.map((t) => t.type.name),
  }));

  const total = data.count;
  const totalPages = Math.ceil(total / limit);
  const page = Math.floor(offset / limit) + 1;

  return {
    items,
    page,
    limit,
    total,
    totalPages,
    hasNextPage: data.next !== null,
    hasPreviousPage: data.previous !== null,
  };
}

export async function getPokemonDetail(
  idOrName: number | string,
  signal?: AbortSignal,
): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`, { signal });

  if (!response.ok) {
    throw new Error(`No se encontró el Pokémon "${idOrName}".`);
  }

  const data: PokeApiPokemonDetail = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: getImageUrl(data.sprites),
    sprites: {
      front: data.sprites.front_default ?? '',
      official: data.sprites.other['official-artwork'].front_default ?? '',
    },
    types: data.types.map((t) => ({
      name: t.type.name,
      url: t.type.url,
    })),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    })),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    height: data.height,
    weight: data.weight,
  };
}

export async function getPokemonTypes(
  signal?: AbortSignal,
): Promise<PokemonTypeListItem[]> {
  const response = await fetch(`${BASE_URL}/type`, { signal });

  if (!response.ok) {
    throw new Error('No se pudieron cargar los tipos de Pokémon.');
  }

  const data: PokeApiListResponse = await response.json();
  return data.results.filter((t) => t.name !== 'unknown' && t.name !== 'shadow');
}

export async function getPokemonByType(
  typeName: string,
  signal?: AbortSignal,
): Promise<PokemonTypeDetail> {
  const response = await fetch(`${BASE_URL}/type/${typeName}`, { signal });

  if (!response.ok) {
    throw new Error(`No se encontró el tipo "${typeName}".`);
  }

  const data: PokeApiTypeDetail = await response.json();
  return {
    name: data.name,
    pokemon: data.pokemon,
  };
}

export async function getPokemonListByType(
  typeName: string,
  signal?: AbortSignal,
): Promise<PokemonListItem[]> {
  const typeData = await getPokemonByType(typeName, signal);

  const pokemonEntries = typeData.pokemon.slice(0, 60);

  const detailPromises = pokemonEntries.map((entry) => {
    const url = entry.pokemon.url;
    return fetch(url, { signal }).then((res) => {
      if (!res.ok) throw new Error(`Error al cargar ${entry.pokemon.name}`);
      return res.json() as Promise<PokeApiPokemonDetail>;
    });
  });

  const details = await Promise.all(detailPromises);

  return details.map((detail) => ({
    id: detail.id,
    name: detail.name,
    image: getImageUrl(detail.sprites),
    types: detail.types.map((t) => t.type.name),
  }));
}
