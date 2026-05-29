# Pokédex App

Desarrollador: Rodrigo Máximo Trigo González

Aplicación web tipo Pokédex construida con React, Vite y TypeScript. Consume directamente PokéAPI para listar Pokémon, consultar detalles, buscar, filtrar por tipo, guardar favoritos en `localStorage` y comparar estadísticas base de dos Pokémon.

## Tecnologías Utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Fetch API
- PokéAPI REST
- localStorage
- CSS organizado en `src/styles/global.css`
- ESLint

## Instalación

```bash
cd frontend
npm install
```

## Ejecutar En Desarrollo

```bash
cd frontend
npm run dev
```

Abrir la URL indicada por Vite, normalmente `http://localhost:5173/`.

## Validaciones

```bash
cd frontend
npm run typecheck
npm run lint
npm run build
```

## Funcionalidades Implementadas

- Listado inicial de 30 Pokémon desde `GET /pokemon?limit=30`.
- Tarjetas con ID, nombre, imagen, tipos y botón de favorito.
- Botón `Cargar más` para ampliar el listado.
- Detalle de Pokémon consultado por ID o nombre.
- Detalle con nombre, número, imagen, tipos, peso, altura, habilidades y estadísticas base.
- Búsqueda case-insensitive por nombre.
- Filtro por tipo usando los tipos obtenidos desde PokéAPI.
- Integración correcta entre búsqueda y filtro.
- Favoritos con persistencia en `localStorage`.
- Vista dedicada de favoritos con estado vacío.
- Comparador de dos Pokémon con HP, Attack, Defense, Special Attack, Special Defense y Speed.
- Advertencia al intentar comparar el mismo Pokémon consigo mismo.
- Estados de carga, error y sin resultados.
- Navegación principal: Inicio, Favoritos y Comparar.
- Diseño responsive para móvil y escritorio.
- Colores visuales por tipo de Pokémon.
- Cache simple en memoria para detalles ya consultados.

## Estructura Principal

```txt
frontend/
  src/
    components/
    hooks/
    pages/
    services/
    storage/
    styles/
    types/
    utils/
```

## Capturas De Pantalla

Sección preparada para capturas de la demo:

- Inicio con listado, búsqueda y filtros.
- Detalle de un Pokémon.
- Vista de favoritos.
- Comparador de estadísticas.

## Problemas Encontrados Y Resolución

- El proyecto inicial era Expo/React Native y no coincidía con el stack solicitado. Se migró el frontend a React + Vite + TypeScript web.
- `npm install` mostró un conflicto entre versiones de `@types/react` y `@types/react-dom`. Se alinearon ambas dependencias a la línea `19.1.x`.
- Se reemplazó `AsyncStorage` por `localStorage` para cumplir la persistencia web solicitada.
- Se separó la lógica en servicios, hooks, storage, componentes, páginas, tipos y utilidades para evitar concentrar la implementación en un solo archivo.

## Checklist Final

- [x] El proyecto instala dependencias correctamente.
- [x] El listado de Pokémon carga correctamente.
- [x] El detalle de Pokémon funciona.
- [x] La búsqueda por nombre funciona.
- [x] El filtro por tipo funciona.
- [x] Los favoritos se guardan y se mantienen al recargar.
- [x] El comparador funciona con dos Pokémon.
- [x] La aplicación muestra estados de carga, error y sin resultados.
- [x] El código está separado en componentes, servicios, hooks, tipos y páginas.
- [x] El README explica cómo ejecutar el proyecto.
- [x] La aplicación no requiere variables de entorno secretas.
- [x] `npm run typecheck` termina correctamente.
- [x] `npm run lint` termina correctamente.
- [x] `npm run build` termina correctamente.
