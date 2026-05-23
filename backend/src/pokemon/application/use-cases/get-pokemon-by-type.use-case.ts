import { Injectable } from '@nestjs/common';
import { Pokemon } from '../../domain/models/pokemon.model';
import { PokeApiService } from '../../infrastructure/pokeapi/pokeapi.service';

@Injectable()
export class GetPokemonByTypeUseCase {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async execute(typeName: string): Promise<Pokemon[]> {
    return this.pokeApiService.getPokemonByType(typeName);
  }
}
