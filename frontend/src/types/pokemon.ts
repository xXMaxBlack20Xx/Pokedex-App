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
