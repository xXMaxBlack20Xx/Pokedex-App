# Pokédex Mobile

## Desarrollador
Rodrigo Máximo Trigo González

## Descripción
Aplicación móvil desarrollada con Expo, React Native y TypeScript que consume PokéAPI para listar Pokémon, consultar detalles, buscar, filtrar por tipo, guardar favoritos y comparar estadísticas base.

## Tecnologías utilizadas
- Expo SDK 54
- React Native
- TypeScript
- PokéAPI
- AsyncStorage
- React Navigation
- FlatList

## Instalación
```bash
cd frontend
npm install
```

## Ejecución con Expo Go
```bash
cd frontend
npx expo start
```

Después:
- Escanear el QR con Expo Go en Android o iOS.
- O abrir en emulador si está disponible.

Si el puerto 8081 está ocupado por otro proyecto, ejecutar:

```bash
npx expo start --clear --port 8082
```

## Funcionalidades
- Listado de Pokémon.
- Detalle de Pokémon.
- Búsqueda por nombre.
- Filtro por tipo.
- Favoritos persistentes.
- Comparador de estadísticas.
- Estados de carga, error y sin resultados.
- Diseño adaptado a móvil.

## Capturas
Agregar espacio para capturas:
- Pantalla principal.
- Detalle.
- Favoritos.
- Comparador.

## Problemas encontrados y solución
- El proyecto actual estaba implementado como aplicación web con Vite, React Router y `localStorage`. Se migró el directorio `frontend` a Expo + React Native, usando React Navigation y AsyncStorage para cumplir el apartado móvil.
- El primer `npx expo install` no pudo detectar el SDK porque `expo` todavía no estaba instalado localmente. Se ejecutó `npm install` y luego se alinearon dependencias con `npx expo install`.
- TypeScript detectó falta de `expo-status-bar`, un ancho porcentual no inferido correctamente y valores posiblemente nulos en el comparador. Se instaló `expo-status-bar` y se corrigieron los tipos.
- ESLint mostraba una advertencia por usar sintaxis ESM en `eslint.config.js` sin declarar el paquete como módulo. Se renombró a `eslint.config.mjs`.
- Al validar `npx expo start --clear`, el puerto 8081 estaba ocupado por otro proyecto. Se verificó el arranque usando `npx expo start --clear --port 8082`.
- `npm audit --omit=dev` reportó vulnerabilidades moderadas transitivas de Expo relacionadas con `uuid`. La corrección propuesta por npm requiere `npm audit fix --force` y cambiaría Expo a una versión incompatible, por lo que no se aplicó para no romper Expo Go.
- El dispositivo de prueba usaba Expo Go 54 y el proyecto había quedado en SDK 56. Se bajó Expo a SDK 54 y se alinearon `react`, `react-native`, `expo-status-bar`, `react-native-safe-area-context`, `react-native-screens`, `@types/react` y `typescript` con `npx expo install --fix`.

## Checklist final
- [x] El proyecto instala dependencias correctamente.
- [x] La app abre en Expo Go.
- [x] El listado carga correctamente.
- [x] El detalle funciona.
- [x] La búsqueda funciona.
- [x] El filtro por tipo funciona.
- [x] Los favoritos persisten con AsyncStorage.
- [x] El comparador funciona.
- [x] Hay estados de carga, error y vacío.
- [x] El código está separado por componentes, servicios, hooks, tipos y pantallas.
- [x] El README explica cómo ejecutar el proyecto.
