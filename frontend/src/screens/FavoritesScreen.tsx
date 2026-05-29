import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PokemonCard } from '../components/PokemonCard';
import { colors } from '../constants/colors';
import { useFavorites } from '../hooks/useFavorites';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export function FavoritesScreen({ navigation }: Props) {
  const { favorites, isLoading, errorMessage, isFavorite, removeFavorite, reloadFavorites } = useFavorites();

  if (isLoading) return <LoadingState message="Cargando favoritos..." />;
  if (errorMessage) return <ErrorState message={errorMessage} onRetry={reloadFavorites} />;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <EmptyState title="Sin favoritos" message="Agrega Pokémon desde el listado o el detalle para verlos aquí." />
        }
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            isFavorite={isFavorite(item.id)}
            onPress={() => navigation.navigate('PokemonDetail', { name: item.name })}
            onToggleFavorite={() => void removeFavorite(item.id)}
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
});
