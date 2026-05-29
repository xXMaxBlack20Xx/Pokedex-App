import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { FavoriteButton } from '../components/FavoriteButton';
import { LoadingState } from '../components/LoadingState';
import { StatBar } from '../components/StatBar';
import { colors } from '../constants/colors';
import { useFavorites, toFavoritePokemon } from '../hooks/useFavorites';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import type { RootStackParamList } from '../navigation/types';
import { formatHeight, formatName, formatPokemonId, formatWeight } from '../utils/formatting';
import { getTypeColor } from '../utils/typeColors';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

export function PokemonDetailScreen({ navigation, route }: Props) {
  const { pokemon, isLoading, errorMessage } = usePokemonDetail(route.params.name);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) return <LoadingState message="Cargando detalle..." />;
  if (errorMessage) return <ErrorState message={errorMessage} onRetry={() => navigation.replace('PokemonDetail', route.params)} />;
  if (!pokemon) return <EmptyState title="Detalle no disponible" message="No encontramos este Pokémon." />;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
              <Text style={styles.name}>{formatName(pokemon.name)}</Text>
            </View>
            <FavoriteButton
              isFavorite={isFavorite(pokemon.id)}
              onPress={() => void toggleFavorite(toFavoritePokemon(pokemon))}
            />
          </View>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <View key={type.name} style={[styles.typeChip, { backgroundColor: getTypeColor(type.name) }]}>
                <Text style={styles.typeText}>{formatName(type.name)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.metrics}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatHeight(pokemon.height)}</Text>
            <Text style={styles.metricLabel}>Altura</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{formatWeight(pokemon.weight)}</Text>
            <Text style={styles.metricLabel}>Peso</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilities}>
            {pokemon.abilities.map((ability) => (
              <Text key={ability.name} style={styles.ability}>
                {formatName(ability.name)}{ability.isHidden ? ' (Oculta)' : ''}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} stat={stat} />
          ))}
        </View>

        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: 18,
  },
  headerTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  number: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '900',
  },
  name: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  image: {
    height: 220,
    marginVertical: 10,
    width: 220,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  typeChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  typeText: {
    color: colors.surface,
    fontWeight: '900',
  },
  metrics: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  metricCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    flex: 1,
    padding: 16,
  },
  metricValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  metricLabel: {
    color: colors.textMuted,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginTop: 14,
    padding: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },
  abilities: {
    gap: 8,
  },
  ability: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: 999,
    marginTop: 16,
    paddingVertical: 14,
  },
  backText: {
    color: colors.surface,
    fontWeight: '900',
  },
});
