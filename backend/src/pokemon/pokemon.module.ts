import { Module } from '@nestjs/common';
import { GetPokemonByTypeUseCase } from './application/use-cases/get-pokemon-by-type.use-case';
import { GetPokemonDetailUseCase } from './application/use-cases/get-pokemon-detail.use-case';
import { GetPokemonListUseCase } from './application/use-cases/get-pokemon-list.use-case';
import { GetPokemonTypesUseCase } from './application/use-cases/get-pokemon-types.use-case';
import { PokeApiService } from './infrastructure/pokeapi/pokeapi.service';
import { PokemonController } from './presentation/controllers/pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [
    GetPokemonListUseCase,
    GetPokemonDetailUseCase,
    GetPokemonTypesUseCase,
    GetPokemonByTypeUseCase,
    PokeApiService,
  ],
})
export class PokemonModule {}
