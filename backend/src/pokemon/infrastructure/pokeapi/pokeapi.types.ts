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
}
