import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PokeApiService } from './../src/pokemon/infrastructure/pokeapi/pokeapi.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PokeApiService)
      .useValue({
        getPokemonList: jest.fn().mockResolvedValue({
          items: [
            {
              id: 1,
              name: 'bulbasaur',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
              types: ['grass', 'poison'],
            },
          ],
          page: 1,
          limit: 1,
          total: 1302,
          totalPages: 1302,
          hasNextPage: true,
          hasPreviousPage: false,
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/api/pokemon (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/pokemon?limit=1&page=1')
      .expect(200)
      .expect((response) => {
        const responseBody = response.body as unknown;

        if (!isPokemonListPageResponse(responseBody)) {
          throw new Error('La respuesta debe ser una pagina de Pokemon');
        }

        const firstPokemon = responseBody.items[0];

        expect(responseBody.items).toHaveLength(1);
        expect(responseBody.page).toBe(1);
        expect(responseBody.limit).toBe(1);
        expect(typeof responseBody.total).toBe('number');
        expect(typeof responseBody.totalPages).toBe('number');
        expect(typeof responseBody.hasNextPage).toBe('boolean');
        expect(typeof responseBody.hasPreviousPage).toBe('boolean');
        expect(typeof firstPokemon.id).toBe('number');
        expect(typeof firstPokemon.name).toBe('string');
        expect(typeof firstPokemon.image).toBe('string');
        expect(Array.isArray(firstPokemon.types)).toBe(true);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});

function isPokemonListPageResponse(value: unknown): value is {
  items: Array<{
    id: unknown;
    name: unknown;
    image: unknown;
    types: unknown;
  }>;
  page: unknown;
  limit: unknown;
  total: unknown;
  totalPages: unknown;
  hasNextPage: unknown;
  hasPreviousPage: unknown;
} {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    Array.isArray(response.items) &&
    typeof response.page === 'number' &&
    typeof response.limit === 'number' &&
    typeof response.total === 'number' &&
    typeof response.totalPages === 'number' &&
    typeof response.hasNextPage === 'boolean' &&
    typeof response.hasPreviousPage === 'boolean'
  );
}
