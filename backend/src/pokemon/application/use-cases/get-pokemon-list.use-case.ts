import { Injectable } from '@nestjs/common';
import { PokemonListPage } from '../../domain/models/pokemon-list-page.model';
import { PokeApiService } from '../../infrastructure/pokeapi/pokeapi.service';

@Injectable()
export class GetPokemonListUseCase {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async execute(page = 1, limit = 20): Promise<PokemonListPage> {
    return this.pokeApiService.getPokemonList(page, limit);
  }
}
