import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../hooks/useFavorites';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { getPokemonDetail } from '../services/pokeApi';
import type { PokemonDetail, PokemonFavorite, PokemonListItem } from '../types/pokemon';

interface DetailPageProps {
  pokemon: PokemonListItem;
  onGoBack: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

export function DetailPage({ pokemon, onGoBack }: DetailPageProps) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDetail() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getPokemonDetail(
          pokemon.id,
          abortController.signal,
        );
        if (!abortController.signal.aborted) {
          setDetail(data);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setErrorMessage('No se pudo cargar el detalle del Pokémon.');
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadDetail();
    return () => abortController.abort();
  }, [pokemon.id]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingState message="Cargando detalle..." />
      </SafeAreaView>
    );
  }

  if (errorMessage || !detail) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <ErrorState message={errorMessage ?? 'Pokémon no encontrado.'} />
        </View>
      </SafeAreaView>
    );
  }

  const favoriteData: PokemonFavorite = {
    id: detail.id,
    name: detail.name,
    image: detail.image,
    types: detail.types.map((t) => t.name),
    addedAt: Date.now(),
  };

  const fav = isFavorite(detail.id);

  const maxStat = Math.max(...detail.stats.map((s) => s.baseStat), 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={onGoBack} style={styles.backButton}>
          <Text style={styles.backText}>{'\u2190'} Volver</Text>
        </Pressable>

        <View style={styles.hero}>
          {detail.image ? (
            <Image
              resizeMode="contain"
              source={{ uri: detail.image }}
              style={styles.image}
            />
          ) : null}
        </View>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.number}>
              #{detail.id.toString().padStart(3, '0')}
            </Text>
            <Text style={styles.name}>
              {detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}
            </Text>
          </View>
          <Pressable
            hitSlop={12}
            onPress={() => toggleFavorite(favoriteData)}
            style={styles.favoriteBtn}
          >
            <Text style={[styles.favoriteIcon, fav && styles.favoriteIconActive]}>
              {fav ? '\u2665' : '\u2661'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.types}>
          {detail.types.map((t) => {
            const color = TYPE_COLORS[t.name] ?? '#8793a3';
            return (
              <View
                key={t.name}
                style={[styles.typeBadge, { backgroundColor: color }]}
              >
                <Text style={styles.typeText}>{t.name}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{(detail.height / 10).toFixed(1)} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{(detail.weight / 10).toFixed(1)} kg</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.abilitiesRow}>
            {detail.abilities.map((a) => (
              <View key={a.name} style={styles.abilityBadge}>
                <Text style={styles.abilityText}>
                  {a.name
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                </Text>
                {a.isHidden && (
                  <Text style={styles.hiddenAbility}>(oculta)</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {detail.stats.map((stat) => {
            const pct = (stat.baseStat / maxStat) * 100;
            const label = STAT_LABELS[stat.name] ?? stat.name;
            return (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statLabel}>{label}</Text>
                <Text style={styles.statValue}>{stat.baseStat}</Text>
                <View style={styles.statBarBg}>
                  <View
                    style={[
                      styles.statBarFill,
                      {
                        width: `${Math.max(pct, 2)}%` as `${number}%`,
                        backgroundColor:
                          stat.baseStat >= 100
                            ? '#16a34a'
                            : stat.baseStat >= 60
                              ? '#f59e0b'
                              : '#ef4444',
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f6f8fb',
    flex: 1,
  },
  errorContainer: {
    padding: 24,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 4,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#596579',
    fontSize: 16,
    fontWeight: '700',
  },
  hero: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 20,
    padding: 24,
  },
  image: {
    height: 220,
    width: 220,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  number: {
    color: '#c83642',
    fontSize: 16,
    fontWeight: '800',
  },
  name: {
    color: '#17202b',
    fontSize: 30,
    fontWeight: '900',
  },
  favoriteBtn: {
    minHeight: 36,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    color: '#cbd5e1',
    fontSize: 26,
  },
  favoriteIconActive: {
    color: '#ef4444',
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  typeBadge: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: '#17202b',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 14,
  },
  infoItem: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    padding: 14,
  },
  infoLabel: {
    color: '#8793a3',
    fontSize: 13,
    fontWeight: '600',
  },
  infoValue: {
    color: '#17202b',
    fontSize: 17,
    fontWeight: '800',
  },
  abilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityBadge: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  abilityText: {
    color: '#17202b',
    fontSize: 14,
    fontWeight: '700',
  },
  hiddenAbility: {
    color: '#8793a3',
    fontSize: 12,
    fontStyle: 'italic',
  },
  statRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  statLabel: {
    color: '#596579',
    fontSize: 13,
    fontWeight: '800',
    width: 48,
  },
  statValue: {
    color: '#17202b',
    fontSize: 14,
    fontWeight: '800',
    width: 36,
    textAlign: 'right',
  },
  statBarBg: {
    backgroundColor: '#e8edf3',
    borderRadius: 6,
    flex: 1,
    height: 10,
    overflow: 'hidden',
  },
  statBarFill: {
    borderRadius: 6,
    height: 10,
  },
});
