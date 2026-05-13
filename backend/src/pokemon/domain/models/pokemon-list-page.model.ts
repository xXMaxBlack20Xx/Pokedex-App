import { Pokemon } from './pokemon.model';

export interface PokemonListPage {
  items: Pokemon[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
