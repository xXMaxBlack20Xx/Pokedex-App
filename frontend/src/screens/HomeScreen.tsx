import { useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { colors } from '../constants/colors';
import { useFavorites, toFavoritePokemon } from '../hooks/useFavorites';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonTypes } from '../hooks/usePokemonTypes';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { types, errorMessage: typesErrorMessage } = usePokemonTypes();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { filteredPokemon, isLoading, isLoadingMore, errorMessage, canLoadMore, loadMore, refresh } =
    usePokemonList(searchQuery, selectedType);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }

  if (isLoading) return <LoadingState />;
  if (errorMessage && filteredPokemon.length === 0) return <ErrorState message={errorMessage} onRetry={handleRefresh} />;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => String(item.id)}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <EmptyState title="Sin resultados" message="Prueba con otro nombre o limpia el filtro de tipo." />
        }
        ListFooterComponent={
          canLoadMore ? (
            <Pressable accessibilityRole="button" disabled={isLoadingMore} onPress={loadMore} style={styles.loadMore}>
              <Text style={styles.loadMoreText}>{isLoadingMore ? 'Cargando...' : 'Cargar más'}</Text>
            </Pressable>
          ) : null
        }
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={styles.heroText}>
                <Text style={styles.eyebrow}>PokéAPI móvil</Text>
                <Text style={styles.title}>Explora, guarda y compara Pokémon</Text>
                <Text style={styles.subtitle}>{favorites.length} favoritos guardados</Text>
              </View>
              <View style={styles.actions}>
                <Pressable onPress={() => navigation.navigate('Favorites')} style={styles.actionButton}>
                  <Text style={styles.actionText}>Favoritos</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Compare')} style={styles.actionButtonDark}>
                  <Text style={styles.actionTextDark}>Comparar</Text>
                </Pressable>
              </View>
            </View>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            <TypeFilter types={types} selectedType={selectedType} onSelectType={setSelectedType} />
            {typesErrorMessage ? <Text style={styles.inlineError}>{typesErrorMessage}</Text> : null}
            {errorMessage ? <Text style={styles.inlineError}>{errorMessage}</Text> : null}
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.primary} />}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            isFavorite={isFavorite(item.id)}
            onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
            onToggleFavorite={() => void toggleFavorite(toFavoritePokemon(item))}
          />
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    marginBottom: 16,
    padding: 18,
  },
  heroText: {
    marginBottom: 14,
  },
  eyebrow: {
    color: '#FEE2E2',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.surface,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 31,
    marginTop: 6,
  },
  subtitle: {
    color: '#FEE2E2',
    fontWeight: '700',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    flex: 1,
    paddingVertical: 11,
  },
  actionButtonDark: {
    backgroundColor: colors.text,
    borderRadius: 999,
    flex: 1,
    paddingVertical: 11,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '900',
    textAlign: 'center',
  },
  actionTextDark: {
    color: colors.surface,
    fontWeight: '900',
    textAlign: 'center',
  },
  inlineError: {
    color: colors.danger,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadMore: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: 999,
    marginTop: 8,
    paddingVertical: 14,
  },
  loadMoreText: {
    color: colors.surface,
    fontWeight: '900',
  },
});
