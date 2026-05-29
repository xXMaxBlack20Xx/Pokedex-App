import { Injectable } from '@nestjs/common';
import { PokeApiService } from '../../infrastructure/pokeapi/pokeapi.service';

@Injectable()
export class GetPokemonTypesUseCase {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async execute(): Promise<string[]> {
    return this.pokeApiService.getPokemonTypes();
  }
}
