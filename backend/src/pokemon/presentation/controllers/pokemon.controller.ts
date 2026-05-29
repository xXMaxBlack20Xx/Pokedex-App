import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GetPokemonByTypeUseCase } from '../../application/use-cases/get-pokemon-by-type.use-case';
import { GetPokemonDetailUseCase } from '../../application/use-cases/get-pokemon-detail.use-case';
import { GetPokemonListUseCase } from '../../application/use-cases/get-pokemon-list.use-case';
import { GetPokemonTypesUseCase } from '../../application/use-cases/get-pokemon-types.use-case';
import { PokemonDetailDto } from '../dto/pokemon-detail.dto';
import { PokemonListItemDto } from '../dto/pokemon-list-item.dto';
import { PokemonListPageDto } from '../dto/pokemon-list-page.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly getPokemonListUseCase: GetPokemonListUseCase,
    private readonly getPokemonDetailUseCase: GetPokemonDetailUseCase,
    private readonly getPokemonTypesUseCase: GetPokemonTypesUseCase,
    private readonly getPokemonByTypeUseCase: GetPokemonByTypeUseCase,
  ) {}

  @Get()
  async getPokemonList(
    @Query('limit') limitQuery?: string,
    @Query('page') pageQuery?: string,
  ): Promise<PokemonListPageDto> {
    try {
      const limit = this.parseLimit(limitQuery);
      const page = this.parsePage(pageQuery);
      return await this.getPokemonListUseCase.execute(page, limit);
    } catch {
      throw new HttpException(
        {
          message: 'No se pudo obtener el listado de Pokémon',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('types')
  async getPokemonTypes(): Promise<string[]> {
    try {
      return await this.getPokemonTypesUseCase.execute();
    } catch {
      throw new HttpException(
        {
          message: 'No se pudieron obtener los tipos de Pokémon',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('type/:typeName')
  async getPokemonByType(
    @Param('typeName') typeName: string,
  ): Promise<PokemonListItemDto[]> {
    try {
      return await this.getPokemonByTypeUseCase.execute(typeName);
    } catch {
      throw new HttpException(
        {
          message: `No se pudieron obtener los Pokémon del tipo "${typeName}"`,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':idOrName')
  async getPokemonDetail(
    @Param('idOrName') idOrName: string,
  ): Promise<PokemonDetailDto> {
    try {
      const idNumber = Number(idOrName);
      const param = Number.isNaN(idNumber) ? idOrName : idNumber;
      return await this.getPokemonDetailUseCase.execute(param);
    } catch {
      throw new HttpException(
        {
          message: `No se encontró el Pokémon "${idOrName}"`,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private parsePage(pageQuery?: string): number {
    const parsedPage = Number(pageQuery ?? 1);
    if (!Number.isInteger(parsedPage) || parsedPage <= 0) return 1;
    return parsedPage;
  }

  private parseLimit(limitQuery?: string): number {
    const parsedLimit = Number(limitQuery ?? 20);
    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) return 20;
    return Math.min(parsedLimit, 100);
  }
}
