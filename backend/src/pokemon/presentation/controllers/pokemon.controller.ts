import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GetPokemonListUseCase } from '../../application/use-cases/get-pokemon-list.use-case';
import { PokemonListPageDto } from '../dto/pokemon-list-page.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly getPokemonListUseCase: GetPokemonListUseCase) {}

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

  private parsePage(pageQuery?: string): number {
    const parsedPage = Number(pageQuery ?? 1);

    if (!Number.isInteger(parsedPage) || parsedPage <= 0) {
      return 1;
    }

    return parsedPage;
  }

  private parseLimit(limitQuery?: string): number {
    const parsedLimit = Number(limitQuery ?? 20);

    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      return 20;
    }

    return Math.min(parsedLimit, 100);
  }
}
