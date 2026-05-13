import { Module } from '@nestjs/common';
import { GetPokemonListUseCase } from './application/use-cases/get-pokemon-list.use-case';
import { PokeApiService } from './infrastructure/pokeapi/pokeapi.service';
import { PokemonController } from './presentation/controllers/pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [GetPokemonListUseCase, PokeApiService],
})
export class PokemonModule {}
