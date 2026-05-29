import { Injectable } from '@nestjs/common';
import { Pokemon, PokemonDetail } from '../../domain/models/pokemon.model';
import { PokemonListPage } from '../../domain/models/pokemon-list-page.model';
import {
  mapPokeApiPokemonToPokemon,
  mapPokeApiPokemonToPokemonDetail,
} from '../mappers/pokemon.mapper';
import {
  PokeApiListResponse,
  PokeApiPokemonDetailResponse,
  PokeApiTypeDetailResponse,
  PokeApiTypeListResponse,
} from './pokeapi.types';

@Injectable()
export class PokeApiService {
  private readonly baseUrl =
    process.env.POKEAPI_BASE_URL ?? 'https://pokeapi.co/api/v2';

  async getPokemonList(page: number, limit: number): Promise<PokemonListPage> {
    const offset = (page - 1) * limit;
    const listUrl = new URL(`${this.baseUrl}/pokemon`);
    listUrl.searchParams.set('limit', String(limit));
    listUrl.searchParams.set('offset', String(offset));

    const listResponse = await this.fetchJson<PokeApiListResponse>(
      listUrl.toString(),
    );

    const details = await Promise.all(
      listResponse.results.map((pokemon) =>
        this.fetchJson<PokeApiPokemonDetailResponse>(pokemon.url),
      ),
    );

    const total = Number(listResponse.count);
    const totalPages = Math.ceil(total / limit);

    return {
      items: details.map(mapPokeApiPokemonToPokemon),
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async getPokemonDetail(idOrName: number | string): Promise<PokemonDetail> {
    const raw = await this.fetchJson<PokeApiPokemonDetailResponse>(
      `${this.baseUrl}/pokemon/${String(idOrName).toLowerCase().trim()}`,
    );
    return mapPokeApiPokemonToPokemonDetail(raw);
  }

  async getPokemonTypes(): Promise<string[]> {
    const data = await this.fetchJson<PokeApiTypeListResponse>(
      `${this.baseUrl}/type`,
    );
    return data.results
      .map((t) => t.name)
      .filter((name) => name !== 'unknown' && name !== 'shadow');
  }

  async getPokemonByType(
    typeName: string,
    limit = 60,
  ): Promise<Pokemon[]> {
    const data = await this.fetchJson<PokeApiTypeDetailResponse>(
      `${this.baseUrl}/type/${typeName.toLowerCase().trim()}`,
    );

    const entries = data.pokemon.slice(0, limit);

    const details = await Promise.all(
      entries.map((entry) =>
        this.fetchJson<PokeApiPokemonDetailResponse>(entry.pokemon.url),
      ),
    );

    return details.map(mapPokeApiPokemonToPokemon);
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`PokeAPI respondio con estado ${response.status}`);
    }

    return (await response.json()) as T;
  }
}
