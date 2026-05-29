export interface PokeApiListResponse {
  count: number;
  results: PokeApiListResult[];
}

export interface PokeApiListResult {
  name: string;
  url: string;
}

export interface PokeApiPokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: {
    front_default?: string | null;
    other?: {
      'official-artwork'?: {
        front_default?: string | null;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export interface PokeApiTypeListResponse {
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokeApiTypeDetailResponse {
  name: string;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }>;
}
