import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../hooks/useFavorites';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PaginationBar } from '../components/PaginationBar';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { getPokemonList, getPokemonListByType, getPokemonTypes } from '../services/pokeApi';
import type {
  PokemonListItem,
  PokemonListPage,
  PokemonFavorite,
} from '../types/pokemon';

const POKEMON_LIMIT = 30;

const INITIAL_PAGE: PokemonListPage = {
  items: [],
  page: 1,
  limit: POKEMON_LIMIT,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

type FilterMode = 'all' | 'favorites';

interface HomeScreenProps {
  onNavigateToDetail: (pokemon: PokemonListItem) => void;
}

export function HomeScreen({ onNavigateToDetail }: HomeScreenProps) {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [pagination, setPagination] = useState<PokemonListPage>(INITIAL_PAGE);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const { favorites, loaded: favoritesLoaded, isFavorite, toggleFavorite } = useFavorites();
  const { width } = useWindowDimensions();
  const columns = width >= 720 ? 3 : width >= 480 ? 2 : 1;
  const totalPages = Math.max(pagination.totalPages, 1);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTypes() {
      try {
        setIsLoadingTypes(true);
        const types = await getPokemonTypes(abortController.signal);
        if (!abortController.signal.aborted) {
          setAvailableTypes(types);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setAvailableTypes([]);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingTypes(false);
        }
      }
    }

    void loadTypes();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (selectedType || filterMode === 'favorites') return;

    const abortController = new AbortController();

    async function loadPokemon() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const pokemonPage = await getPokemonList(
          POKEMON_LIMIT,
          page,
          abortController.signal,
        );

        if (!abortController.signal.aborted) {
          setPokemonList(pokemonPage.items);
          setPagination(pokemonPage);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setErrorMessage('No se pudo cargar el listado de Pokémon.');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPokemon();
    return () => abortController.abort();
  }, [page, selectedType, filterMode]);

  useEffect(() => {
    if (!selectedType) return;

    const abortController = new AbortController();

    async function loadByType() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const items = await getPokemonListByType(
          selectedType,
          abortController.signal,
        );

        if (!abortController.signal.aborted) {
          setPokemonList(items);
          setPagination({
            ...INITIAL_PAGE,
            items,
            total: items.length,
            totalPages: 1,
          });
          setPage(1);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setErrorMessage('No se pudieron cargar los Pokémon de este tipo.');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadByType();
    return () => abortController.abort();
  }, [selectedType]);

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToNextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  function handleSelectType(type: string) {
    setSelectedType(type);
    setFilterMode('all');
  }

  function handleToggleFavoritesMode() {
    if (filterMode === 'favorites') {
      setFilterMode('all');
      setPage(1);
    } else {
      setFilterMode('favorites');
      setSelectedType('');
    }
  }

  const filteredPokemon = (() => {
    let list = pokemonList;

    if (filterMode === 'favorites') {
      list = favorites.map((f) => ({
        id: f.id,
        name: f.name,
        image: f.image,
        types: f.types,
      }));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(query));
    }

    return list;
  })();

  const showEmptyState = !isLoading && !errorMessage;
  const showPagination = !selectedType && filterMode === 'all';

  function getEmptyMessage(): string {
    const hasSearch = searchQuery.trim().length > 0;
    const hasType = selectedType.length > 0;

    if (filterMode === 'favorites' && favorites.length === 0) {
      return 'No tienes Pokémon favoritos. Toca el \u2661 para agregar.';
    }
    if (hasSearch && hasType) {
      return `No se encontraron Pokémon que coincidan con "${searchQuery.trim()}" y el tipo "${selectedType}".`;
    }
    if (hasSearch) {
      return `No se encontraron Pokémon con el nombre "${searchQuery.trim()}".`;
    }
    if (hasType) {
      return `No hay Pokémon disponibles para el tipo "${selectedType}".`;
    }
    return 'No hay Pokémon disponibles.';
  }

  const handleCardPress = useCallback(
    (pokemon: PokemonListItem) => {
      onNavigateToDetail(pokemon);
    },
    [onNavigateToDetail],
  );

  const handleToggleFavorite = useCallback(
    async (pokemon: PokemonFavorite) => {
      await toggleFavorite(pokemon);
    },
    [toggleFavorite],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar onChangeText={setSearchQuery} value={searchQuery} />

        <TypeFilter
          isLoading={isLoadingTypes}
          onSelectType={handleSelectType}
          selectedType={selectedType}
          types={availableTypes}
        />

        <FlatList
          ListEmptyComponent={
            isLoading ? (
              <LoadingState />
            ) : errorMessage ? (
              <ErrorState message={errorMessage} />
            ) : (
              <EmptyState message={getEmptyMessage()} />
            )
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Pokédex</Text>
                <PressableButton
                  isActive={filterMode === 'favorites'}
                  label="Favoritos"
                  onPress={handleToggleFavoritesMode}
                />
              </View>
              {showPagination && (
                <Text style={styles.counter}>
                  Página {page} de {totalPages} &middot;{' '}
                  {filteredPokemon.length} de {pagination.total} Pokémon
                </Text>
              )}
              {selectedType ? (
                <Text style={styles.counter}>
                  Tipo: {selectedType} &middot; {filteredPokemon.length} Pokémon
                  {searchQuery.trim() ? ` (filtrados por nombre)` : ''}
                </Text>
              ) : filterMode === 'favorites' ? (
                <Text style={styles.counter}>
                  {filteredPokemon.length} de {favorites.length} favoritos
                </Text>
              ) : searchQuery.trim() ? (
                <Text style={styles.counter}>
                  Resultados para "{searchQuery.trim()}": {filteredPokemon.length} Pokémon
                </Text>
              ) : null}
            </View>
          }
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          contentContainerStyle={styles.content}
          data={showEmptyState ? filteredPokemon : []}
          key={columns}
          keyExtractor={(pokemon) => String(pokemon.id)}
          numColumns={columns}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PokemonCard
                isFavorite={isFavorite(item.id)}
                onPress={handleCardPress}
                onToggleFavorite={handleToggleFavorite}
                pokemon={item}
              />
            </View>
          )}
        />
      </View>

      {showPagination && (
        <PaginationBar
          canGoNext={page < totalPages}
          canGoPrevious={page > 1}
          isLoading={isLoading}
          onNext={goToNextPage}
          onPrevious={goToPreviousPage}
          page={page}
          totalPages={totalPages}
        />
      )}
    </SafeAreaView>
  );
}

function PressableButton({
  isActive,
  label,
  onPress,
}: {
  isActive: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.favFilterButton,
        isActive && styles.favFilterButtonActive,
      ]}
    >
      <Text
        style={[
          styles.favFilterText,
          isActive && styles.favFilterTextActive,
        ]}
      >
        {isActive ? '\u2665' : '\u2661'} {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f6f8fb',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  header: {
    borderBottomColor: '#dbe3ec',
    borderBottomWidth: 1,
    gap: 8,
    marginBottom: 18,
    paddingBottom: 14,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#111827',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
  },
  counter: {
    color: '#596579',
    fontSize: 14,
    fontWeight: '700',
  },
  row: {
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 12,
  },
  favFilterButton: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  favFilterButtonActive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  favFilterText: {
    color: '#596579',
    fontSize: 13,
    fontWeight: '800',
  },
  favFilterTextActive: {
    color: '#ffffff',
  },
});
