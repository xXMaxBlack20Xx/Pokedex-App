export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
}

export interface PokemonType {
  name: string;
  url?: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  addedAt: number;
}

export interface PokemonListResponse {
  items: PokemonListItem[];
  total: number;
  nextOffset: number | null;
}

export interface ComparePokemon {
  id: number;
  name: string;
  image: string;
  stats: PokemonStat[];
}
