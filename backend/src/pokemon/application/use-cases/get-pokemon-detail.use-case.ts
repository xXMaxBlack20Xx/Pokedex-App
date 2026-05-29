import { Injectable } from '@nestjs/common';
import { PokemonDetail } from '../../domain/models/pokemon.model';
import { PokeApiService } from '../../infrastructure/pokeapi/pokeapi.service';

@Injectable()
export class GetPokemonDetailUseCase {
  constructor(private readonly pokeApiService: PokeApiService) {}

  async execute(idOrName: number | string): Promise<PokemonDetail> {
    return this.pokeApiService.getPokemonDetail(idOrName);
  }
}
