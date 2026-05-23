export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonListPage {
  items: PokemonListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  sprites: {
    front: string;
    official: string;
  };
  types: PokemonTypeInfo[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  height: number;
  weight: number;
}

export interface PokemonTypeInfo {
  name: string;
  url: string;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonTypeListItem {
  name: string;
  url: string;
}

export interface PokemonTypeDetail {
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export interface PokemonFavorite {
  id: number;
  name: string;
  image: string;
  types: string[];
  addedAt: number;
}
