import { PokemonListItemDto } from './pokemon-list-item.dto';

export interface PokemonDetailDto extends PokemonListItemDto {
  height: number;
  weight: number;
  stats: {
    name: string;
    baseStat: number;
  }[];
  abilities: {
    name: string;
    isHidden: boolean;
  }[];
}
