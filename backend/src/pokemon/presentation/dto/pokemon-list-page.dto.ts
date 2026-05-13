import { PokemonListItemDto } from './pokemon-list-item.dto';

export interface PokemonListPageDto {
  items: PokemonListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
