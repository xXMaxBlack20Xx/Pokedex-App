# Contexto del Proyecto: Mini Pokédex con PokéAPI

## 1. Descripción General

Se desarrollará una aplicación web o móvil tipo **Mini Pokédex** que consuma datos desde la API pública **PokéAPI**.

La aplicación debe permitir al usuario:

- Consultar una lista de Pokémon.
- Ver el detalle de cada Pokémon.
- Buscar por nombre.
- Filtrar por tipo.
- Guardar favoritos con persistencia local.
- Comparar estadísticas base entre dos Pokémon.

El objetivo principal es demostrar habilidades de desarrollo frontend/mobile, consumo de APIs REST, manejo de estado, navegación, componentes reutilizables, persistencia local, manejo de errores y buenas prácticas de organización de código.

## 2. API Base

```txt
https://pokeapi.co/api/v2
```

## 3. Tecnologías Elegidas

- Expo (SDK 54)
- React Native
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- CORS

## 4. Objetivo General

Construir una Pokédex funcional que permita listar Pokémon, consultar detalles, buscar, filtrar, guardar favoritos y comparar estadísticas, aplicando una estructura de proyecto clara y buenas prácticas de desarrollo.

## 5. Historias de Usuario

### HU-01: Consultar listado de Pokémon

**Como** usuario de la Pokédex,
**quiero** visualizar una lista inicial de Pokémon,
**para** poder explorar rápidamente los Pokémon disponibles dentro de la aplicación.

**Descripción**

La aplicación debe mostrar un listado inicial de Pokémon en forma de tarjetas. Cada tarjeta debe incluir información básica como nombre, imagen, número de Pokémon y tipos. El listado debe cargarse desde PokéAPI.

**Requerimientos funcionales relacionados**

- RF01: Listar Pokémon.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-02: Consultar detalle de un Pokémon

**Como** usuario de la Pokédex,
**quiero** seleccionar un Pokémon del listado,
**para** consultar su información completa.

**Descripción**

El usuario debe poder abrir una vista o pantalla de detalle al seleccionar un Pokémon. Esta pantalla debe consultar el endpoint correspondiente y mostrar información completa como imagen, tipos, peso, altura, habilidades y estadísticas base.

**Requerimientos funcionales relacionados**

- RF02: Consultar detalle de Pokémon.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-03: Buscar Pokémon por nombre

**Como** usuario de la Pokédex,
**quiero** buscar un Pokémon por su nombre,
**para** encontrar rápidamente un Pokémon específico sin recorrer toda la lista.

**Descripción**

La aplicación debe incluir un campo de búsqueda que permita ingresar el nombre de un Pokémon. Al buscar, la interfaz debe mostrar el resultado correspondiente o un estado de "sin resultados" si no existe coincidencia.

**Requerimientos funcionales relacionados**

- RF03: Buscar Pokémon por nombre.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-04: Filtrar Pokémon por tipo

**Como** usuario de la Pokédex,
**quiero** filtrar Pokémon por tipo,
**para** visualizar únicamente Pokémon que pertenezcan a una categoría específica como fire, water, grass, electric, entre otras.

**Descripción**

La aplicación debe obtener el catálogo de tipos desde PokéAPI y permitir al usuario seleccionar un tipo. Al aplicar el filtro, se deben mostrar únicamente los Pokémon asociados al tipo seleccionado.

**Requerimientos funcionales relacionados**

- RF04: Filtrar Pokémon por tipo.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-05: Guardar Pokémon favoritos

**Como** usuario de la Pokédex,
**quiero** agregar y quitar Pokémon de mi lista de favoritos,
**para** conservar fácilmente los Pokémon que más me interesan.

**Descripción**

La aplicación debe permitir marcar Pokémon como favoritos y quitarlos de favoritos. Los favoritos deben persistirse localmente usando localStorage en web o AsyncStorage en móvil, de manera que se mantengan después de recargar o cerrar la aplicación.

**Requerimientos funcionales relacionados**

- RF05: Agregar y quitar Pokémon favoritos.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-06: Comparar estadísticas de dos Pokémon

**Como** usuario de la Pokédex,
**quiero** comparar las estadísticas base de dos Pokémon,
**para** analizar cuál tiene mejores atributos en categorías como vida, ataque, defensa, ataque especial, defensa especial y velocidad.

**Descripción**

La aplicación debe incluir un comparador donde el usuario pueda seleccionar dos Pokémon y visualizar sus estadísticas base lado a lado. El comparador debe mostrar claramente las diferencias entre ambos Pokémon.

**Requerimientos funcionales relacionados**

- RF06: Comparar estadísticas base de dos Pokémon.
- RF07: Mostrar estados de carga, error y sin resultados.

### HU-07: Visualizar estados de interfaz

**Como** usuario de la Pokédex,
**quiero** recibir retroalimentación visual cuando la aplicación esté cargando, falle o no encuentre resultados,
**para** entender correctamente el estado actual de la aplicación.

**Descripción**

La aplicación debe mostrar estados claros de carga, error y sin resultados en las vistas principales. Esto aplica al listado, búsqueda, filtros, detalle, favoritos y comparador.

**Requerimientos funcionales relacionados**

- RF07: Mostrar carga, error y estado sin resultados.

## 6. Requerimientos Funcionales

### RF01: Listar Pokémon

La aplicación debe mostrar un listado inicial de Pokémon obtenidos desde PokéAPI.

**Descripción**

El sistema debe consultar el endpoint de listado y mostrar al menos 20 Pokémon en pantalla. Cada Pokémon debe representarse mediante una tarjeta reutilizable con su nombre, imagen, número y tipos.

**Criterios de aceptación**

- Dado que el usuario abre la aplicación, cuando se cargue la pantalla principal, entonces debe visualizar una lista de Pokémon.
- Dado que la información se obtiene correctamente, cuando se renderice cada Pokémon, entonces debe mostrarse su nombre, imagen, número y tipos.
- Dado que ocurre un error de red, cuando no se pueda obtener la información, entonces debe mostrarse un mensaje de error.

### RF02: Consultar detalle de Pokémon

La aplicación debe permitir consultar la información completa de un Pokémon seleccionado.

**Descripción**

El sistema debe permitir que el usuario seleccione un Pokémon desde el listado y navegue a una pantalla de detalle. En esta pantalla se debe mostrar información obtenida desde el endpoint de detalle.

**Información mínima a mostrar**

- Imagen del Pokémon.
- Nombre.
- Número.
- Tipos.
- Peso.
- Altura.
- Habilidades.
- Estadísticas base.

**Criterios de aceptación**

- Dado que el usuario selecciona un Pokémon, cuando se abra la pantalla de detalle, entonces debe mostrarse la información completa del Pokémon.
- Dado que el Pokémon existe, cuando se consulte por id o nombre, entonces la aplicación debe obtener sus datos desde PokéAPI.
- Dado que la consulta falle, cuando no se pueda recuperar el detalle, entonces debe mostrarse un mensaje de error.

### RF03: Buscar Pokémon por nombre

La aplicación debe permitir buscar Pokémon por nombre.

**Descripción**

El sistema debe incluir un campo de búsqueda donde el usuario pueda escribir el nombre de un Pokémon. La búsqueda debe consultar o filtrar los datos para mostrar el Pokémon correspondiente.

**Criterios de aceptación**

- Dado que el usuario escribe el nombre de un Pokémon existente, cuando ejecute la búsqueda, entonces debe mostrarse el Pokémon correspondiente.
- Dado que el usuario escribe un nombre inexistente, cuando ejecute la búsqueda, entonces debe mostrarse un estado de "sin resultados".
- Dado que el campo de búsqueda está vacío, cuando no haya búsqueda activa, entonces debe mostrarse el listado inicial o el estado correspondiente.

### RF04: Filtrar Pokémon por tipo

La aplicación debe permitir filtrar Pokémon por tipo.

**Descripción**

El sistema debe consultar los tipos disponibles desde PokéAPI y permitir al usuario seleccionar un tipo. Al aplicar el filtro, se deben mostrar los Pokémon asociados a ese tipo.

**Criterios de aceptación**

- Dado que el usuario selecciona un tipo, cuando se aplique el filtro, entonces deben mostrarse Pokémon pertenecientes a ese tipo.
- Dado que no existan resultados para un filtro, cuando el sistema procese la búsqueda, entonces debe mostrarse un estado de "sin resultados".
- Dado que el usuario elimina el filtro, cuando vuelva al listado general, entonces deben mostrarse nuevamente los Pokémon disponibles.

### RF05: Gestionar favoritos

La aplicación debe permitir agregar y quitar Pokémon favoritos con persistencia local.

**Descripción**

El usuario debe poder marcar Pokémon como favoritos y eliminarlos de su lista de favoritos. Los favoritos deben almacenarse localmente para conservarse al recargar o cerrar la aplicación.

**Persistencia requerida**

- Web: localStorage.
- Móvil: AsyncStorage.

**Criterios de aceptación**

- Dado que el usuario marca un Pokémon como favorito, cuando vuelva a consultar la aplicación, entonces el Pokémon debe mantenerse guardado como favorito.
- Dado que el usuario elimina un Pokémon de favoritos, cuando consulte la lista nuevamente, entonces el Pokémon ya no debe aparecer como favorito.
- Dado que se reinicia o recarga la aplicación, cuando existan favoritos guardados, entonces deben cargarse desde el almacenamiento local.

### RF06: Comparar Pokémon

La aplicación debe permitir comparar las estadísticas base de dos Pokémon.

**Descripción**

El sistema debe permitir seleccionar dos Pokémon y mostrar una comparación de sus estadísticas base. La comparación debe ser clara y visualmente comprensible.

**Estadísticas a comparar**

- HP.
- Attack.
- Defense.
- Special Attack.
- Special Defense.
- Speed.

**Criterios de aceptación**

- Dado que el usuario selecciona dos Pokémon, cuando abra el comparador, entonces deben mostrarse las estadísticas base de ambos.
- Dado que falta seleccionar uno de los Pokémon, cuando el usuario intente comparar, entonces debe indicarse que necesita seleccionar dos Pokémon.
- Dado que ambos Pokémon se cargan correctamente, cuando se muestre la comparación, entonces las estadísticas deben visualizarse lado a lado o mediante una representación clara.

### RF07: Mostrar estados de interfaz

La aplicación debe mostrar estados de carga, error y sin resultados.

**Descripción**

El sistema debe proporcionar retroalimentación visual al usuario durante las operaciones principales de consumo de datos, búsqueda, filtrado, detalle, favoritos y comparación.

**Estados requeridos**

- Cargando.
- Error.
- Sin resultados.
- Estado vacío cuando no existan favoritos.
- Estado inicial cuando no se hayan seleccionado Pokémon para comparar.

**Criterios de aceptación**

- Dado que la aplicación está esperando datos, cuando se realice una consulta, entonces debe mostrarse un estado de carga.
- Dado que ocurre un error, cuando falle una consulta o respuesta, entonces debe mostrarse un mensaje de error.
- Dado que no hay datos para mostrar, cuando una búsqueda o filtro no arroje resultados, entonces debe mostrarse un estado de "sin resultados".

## 7. Requerimientos Técnicos

### RT01: Usar TypeScript

Todo el proyecto debe desarrollarse usando TypeScript.

### RT02: Separar la lógica de API en servicios

La lógica de consumo de PokéAPI debe estar separada en archivos de servicios, evitando colocar llamadas directas a la API dentro de componentes visuales.

### RT03: Crear componentes reutilizables

La interfaz debe dividirse en componentes reutilizables, por ejemplo:

- PokemonCard.
- SearchBar.
- TypeFilter.
- FavoriteButton.
- LoadingState.
- ErrorState.
- EmptyState.
- StatComparison.

### RT04: Definir tipos o interfaces

Se deben crear tipos o interfaces para las respuestas principales de PokéAPI, como Pokémon, detalle de Pokémon, tipos, habilidades y estadísticas.

### RT05: Manejar errores de red o respuestas no válidas

La aplicación debe controlar errores de red, respuestas vacías o datos no válidos.

### RT06: Usar Git con commits claros

El proyecto debe trabajarse con control de versiones desde la primera clase. Los commits deben ser claros, progresivos y relacionados con los avances diarios.

### RT07: Adaptar la interfaz al dispositivo

La interfaz debe ser responsive en web o estar correctamente adaptada a móvil.

### RT08: Evitar concentrar toda la lógica en un solo archivo

El proyecto debe organizarse correctamente en carpetas, componentes, servicios, hooks, tipos, utilidades y almacenamiento.

## 8. Estructura Sugerida del Proyecto

```txt
src/
	components/
	screens/ o pages/
	services/
	hooks/
	types/
	utils/
	storage/
```

### Descripción sugerida de carpetas

- components/: componentes reutilizables de interfaz.
- screens/ o pages/: pantallas principales de la aplicación.
- services/: funciones para consumir PokéAPI.
- hooks/: hooks personalizados para lógica reutilizable.
- types/: interfaces y tipos de TypeScript.
- utils/: funciones auxiliares.
- storage/: lógica de persistencia local para favoritos.

## 9. Endpoints Sugeridos

### Listado de Pokémon

- Endpoint: `GET /pokemon?limit=30`
- Propósito: obtener una lista inicial de Pokémon.

### Detalle de Pokémon

- Endpoint: `GET /pokemon/{id or name}`
- Propósito: obtener información completa de un Pokémon.

### Catálogo de tipos

- Endpoint: `GET /type`
- Propósito: obtener los tipos disponibles.

### Pokémon por tipo

- Endpoint: `GET /type/{id or name}`
- Propósito: obtener Pokémon asociados a un tipo específico.

## 10. Entregables por Clase

### Clase 1: Planeación, estructura y primer consumo de API

**Actividades**

- Crear el repositorio.
- Crear el proyecto base.
- Crear la estructura de carpetas.
- Crear el servicio inicial para consumir PokéAPI.
- Mostrar al menos 20 Pokémon en pantalla.

**Entregables**

- Proyecto inicial ejecutándose sin errores.
- Pantalla principal con listado básico de Pokémon.
- Commit inicial.
- Proyecto comprimido.
- Captura de pantalla del avance.

### Clase 2: Componentes, detalle y navegación

**Actividades**

- Crear componente reutilizable para tarjeta de Pokémon.
- Implementar navegación hacia detalle.
- Consultar endpoint de detalle por id o nombre.
- Mostrar imagen, tipos, peso, altura, habilidades y estadísticas base.

**Entregables**

- Componentes separados.
- Servicio de detalle.
- Listado funcional.
- Pantalla de detalle funcional.
- Rutas o pantallas correctamente conectadas.
- Commit del día.
- Proyecto comprimido.
- Captura del detalle de un Pokémon.

### Clase 3: Búsqueda, filtros y favoritos

**Actividades**

- Agregar búsqueda por nombre.
- Agregar filtro por tipo.
- Crear sistema de favoritos.
- Persistir favoritos localmente.
- Agregar estados de carga, error y sin resultados.

**Entregables**

- Búsqueda implementada.
- Filtro implementado.
- Favoritos implementados.
- Favoritos guardados en localStorage o AsyncStorage.
- Mensajes de carga, error y sin resultados.
- Commit del día.
- Proyecto comprimido.
- Captura de favoritos o filtros.

### Clase 4: Comparador, cierre visual y demo final

**Actividades**

- Implementar comparador de dos Pokémon.
- Mostrar comparación de estadísticas base.
- Pulir diseño, espaciado, colores y responsividad.
- Preparar demo técnica de máximo 5 minutos.
- Subir entrega final al repositorio.

**Entregables**

- Aplicación completa ejecutándose sin errores.
- Comparador funcionando con dos Pokémon.
- Demo de máximo 5 minutos.
- Repositorio actualizado.
- Proyecto comprimido.
- README.
- Evidencias.

## 11. Requisitos de Entrega Final

La entrega final debe incluir:

- Repositorio Git con historial de commits.
- README con instrucciones para instalar y ejecutar el proyecto.
- Capturas de pantalla de las principales vistas.
- Aplicación funcional sin errores críticos en consola.
- Código organizado por componentes, servicios, tipos y pantallas.
- Demo final donde se muestre el flujo completo de la aplicación.

## 12. Criterios de Evaluación

| Criterio | Puntos |
| --- | --- |
| Consumo correcto de PokéAPI | 20 |
| Listado y detalle funcional | 20 |
| Búsqueda, filtros y favoritos | 20 |
| Comparador de Pokémon | 15 |
| Diseño, UX y responsividad/adaptación móvil | 10 |
| Código limpio, estructura y TypeScript | 10 |
| Presentación final | 5 |
| **Total** | **100** |

## 13. Puntos Extra Opcionales

| Bonus | Puntos extra |
| --- | --- |
| Backend NestJS como proxy hacia PokéAPI | +10 |
| Cache de respuestas en backend o frontend | +5 |
| Modo oscuro | +5 |
| Gráfica visual de estadísticas | +5 |
| Paginación o scroll infinito | +5 |
| Pruebas unitarias básicas | +5 |
| Diseño por colores según tipo de Pokémon | +5 |

## 14. Reglas de Trabajo

- El proyecto debe trabajarse con control de versiones desde la primera clase.
- No se permite entregar código copiado sin entenderlo o sin poder explicarlo.
