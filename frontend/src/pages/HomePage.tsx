import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PaginationBar } from '../components/PaginationBar';
import { PokemonCard } from '../components/PokemonCard';
import { getPokemonList } from '../services/pokemonApi';
import { PokemonListItem, PokemonListPage } from '../types/pokemon';

const POKEMON_LIMIT = 20;
const INITIAL_PAGE: PokemonListPage = {
  items: [],
  page: 1,
  limit: POKEMON_LIMIT,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

export function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [pagination, setPagination] = useState<PokemonListPage>(INITIAL_PAGE);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const columns = width >= 720 ? 3 : width >= 480 ? 2 : 1;
  const totalPages = Math.max(pagination.totalPages, 1);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadPokemon() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const pokemonPage = await getPokemonList(
          page,
          POKEMON_LIMIT,
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

    return () => {
      abortController.abort();
    };
  }, [page]);

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToNextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={
            isLoading ? (
              <LoadingState />
            ) : errorMessage ? (
              <ErrorState message={errorMessage} />
            ) : (
              <EmptyState />
            )
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Mini Pokédex</Text>
              <Text style={styles.counter}>
                Página {page} de {totalPages}
              </Text>
              <Text style={styles.counter}>
                {pokemonList.length} de {pagination.total} Pokémon
              </Text>
            </View>
          }
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          contentContainerStyle={styles.content}
          data={isLoading || errorMessage ? [] : pokemonList}
          key={columns}
          keyExtractor={(pokemon) => String(pokemon.id)}
          numColumns={columns}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PokemonCard pokemon={item} />
            </View>
          )}
        />
      </View>

      <PaginationBar
        canGoNext={page < totalPages}
        canGoPrevious={page > 1}
        isLoading={isLoading}
        onNext={goToNextPage}
        onPrevious={goToPreviousPage}
        page={page}
        totalPages={totalPages}
      />
    </SafeAreaView>
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
    paddingTop: 28,
  },
  header: {
    borderBottomColor: '#dbe3ec',
    borderBottomWidth: 1,
    gap: 8,
    marginBottom: 22,
    paddingBottom: 18,
  },
  title: {
    color: '#111827',
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 46,
  },
  counter: {
    color: '#596579',
    fontSize: 15,
    fontWeight: '800',
  },
  row: {
    gap: 14,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 14,
  },
});
