# Mini Pokédex con PokéAPI

Proyecto de Clase 1 para construir una Mini Pokédex con backend propio. El frontend móvil no consume PokéAPI directamente; todas las consultas pasan por un backend en NestJS que consulta, parsea, sanitiza y normaliza la información antes de entregarla a Expo Go.

## Arquitectura General

```txt
frontend Expo Go SDK 54
  -> GET http://localhost:3000/api/pokemon?page=1&limit=20
backend NestJS
  -> GET https://pokeapi.co/api/v2/pokemon?limit=20
  -> GET https://pokeapi.co/api/v2/pokemon/{name}
```

## Tecnologías

- Backend: NestJS, TypeScript, REST API, fetch nativo.
- Frontend: Expo Go SDK 54, React Native, TypeScript, fetch nativo.
- API externa: PokéAPI.

## Estructura

```txt
backend/
  src/
    pokemon/
      domain/
      application/
      infrastructure/
      presentation/
frontend/
  src/
    components/
    pages/
    services/
    types/
```

## Backend

Instalar dependencias:

```bash
cd backend
npm install
```

Crear variables de entorno a partir del ejemplo:

```bash
cp .env
```

Ejecutar en desarrollo:

```bash
npm run start:dev
```

Endpoint disponible en Clase 1:

```txt
GET http://localhost:3000/api/pokemon?page=1&limit=20
```

Respuesta sanitizada y paginada:

```ts
interface PokemonListItemDto {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonListPageDto {
  items: PokemonListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

## Frontend

Instalar dependencias:

```bash
cd frontend
npm install
```

Crear variables de entorno a partir del ejemplo:

```bash
cp .env
```

Ejecutar en desarrollo:

```bash
npm run start
```

Abrir la aplicación con Expo Go escaneando el QR que muestra Metro.

También existe el alias:

```bash
npm run dev
```

Para usar Expo Go en un celular físico, ajusta `EXPO_PUBLIC_API_BASE_URL` en `frontend/.env` con la IP local de tu computadora, por ejemplo `http://192.168.1.50:3000/api`. En simulador iOS puede funcionar `localhost`; en emulador Android suele requerirse `http://10.0.2.2:3000/api`.

## Funcionalidades Implementadas en Clase 1

- Backend NestJS con módulo `pokemon`.
- Endpoint propio `GET /api/pokemon?page=1&limit=20`.
- Paginación de 20 Pokémon por página.
- Consumo de PokéAPI desde backend.
- Consulta de detalle de cada Pokémon para obtener id, imagen y tipos.
- Mapper para convertir respuesta cruda de PokéAPI a datos controlados.
- Manejo básico de error cuando falla PokéAPI.
- CORS configurado para desarrollo local.
- Frontend Expo Go SDK 54 + React Native + TypeScript.
- Servicio frontend separado para consumir solo el backend local.
- Grid responsive con al menos 20 tarjetas de Pokémon.
- Barra inferior de navegación para avanzar y retroceder páginas.
- Tarjetas con número, nombre, imagen y tipos.
- Estados de carga, error y listado vacío.

## Evidencia Esperada Para Entrega

- Captura del backend respondiendo `GET /api/pokemon?page=1&limit=20`.
- Captura del frontend mostrando 20 Pokémon y barra inferior de paginación.
- Evidencia de scripts ejecutando sin errores:
  - `cd backend && npm run start:dev`
  - `cd frontend && npm run start`
- Commit inicial con la estructura del monorepo y README.
