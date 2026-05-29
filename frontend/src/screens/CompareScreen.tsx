import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompareStatRow } from '../components/CompareStatRow';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { colors } from '../constants/colors';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { usePokemonList } from '../hooks/usePokemonList';
import type { PokemonListItem, PokemonStat } from '../types/pokemon';
import { formatName } from '../utils/formatting';
import { requiredStatOrder } from '../utils/pokemon';
import { useState } from 'react';

export function CompareScreen() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const { filteredPokemon, isLoading, errorMessage } = usePokemonList('', '');
  const firstDetail = usePokemonDetail(firstName || undefined);
  const secondDetail = usePokemonDetail(secondName || undefined);
  const firstPokemon = firstDetail.pokemon;
  const secondPokemon = secondDetail.pokemon;
  const samePokemon = Boolean(firstName && secondName && firstName === secondName);
  const missingSelection = !firstName || !secondName;
  const canCompare = firstPokemon && secondPokemon && !samePokemon;

  if (isLoading) return <LoadingState message="Cargando selector..." />;
  if (errorMessage) return <ErrorState message={errorMessage} />;

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Compara estadísticas base</Text>
        <Text style={styles.subtitle}>Selecciona dos Pokémon distintos para ver quién destaca en cada estadística.</Text>

        <Selector
          label="Primer Pokémon"
          pokemon={filteredPokemon}
          selectedName={firstName}
          onSelect={setFirstName}
        />
        <Selector
          label="Segundo Pokémon"
          pokemon={filteredPokemon}
          selectedName={secondName}
          onSelect={setSecondName}
        />

        {missingSelection ? (
          <EmptyState title="Falta selección" message="Elige un Pokémon en cada selector para iniciar la comparación." />
        ) : null}
        {samePokemon ? (
          <View style={styles.warning}>
            <Text style={styles.warningText}>No puedes comparar el mismo Pokémon consigo mismo.</Text>
          </View>
        ) : null}
        {firstDetail.isLoading || secondDetail.isLoading ? <LoadingState message="Preparando comparación..." /> : null}
        {firstDetail.errorMessage || secondDetail.errorMessage ? (
          <ErrorState message={firstDetail.errorMessage ?? secondDetail.errorMessage ?? 'No se pudo comparar.'} />
        ) : null}

        {canCompare ? (
          <View style={styles.compareCard}>
            <View style={styles.compareHeader}>
              <PokemonHeader pokemon={firstPokemon} />
              <PokemonHeader pokemon={secondPokemon} />
            </View>
            {requiredStatOrder.map((statName) => (
              <CompareStatRow
                key={statName}
                statName={statName}
                firstValue={getStatValue(firstPokemon.stats, statName)}
                secondValue={getStatValue(secondPokemon.stats, statName)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

interface SelectorProps {
  label: string;
  pokemon: PokemonListItem[];
  selectedName: string;
  onSelect: (name: string) => void;
}

function Selector({ label, pokemon, selectedName, onSelect }: SelectorProps) {
  return (
    <View style={styles.selectorBlock}>
      <Text style={styles.selectorLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorList}>
        {pokemon.map((item) => {
          const selected = selectedName === item.name;
          return (
            <Pressable
              accessibilityRole="button"
              key={item.id}
              onPress={() => onSelect(item.name)}
              style={[styles.selectorChip, selected && styles.selectorChipActive]}
            >
              <Image source={{ uri: item.image }} style={styles.selectorImage} />
              <Text style={[styles.selectorText, selected && styles.selectorTextActive]}>{formatName(item.name)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function PokemonHeader({ pokemon }: { pokemon: { name: string; image: string } }) {
  return (
    <View style={styles.pokemonHeader}>
      <Image source={{ uri: pokemon.image }} style={styles.headerImage} />
      <Text numberOfLines={1} style={styles.headerName}>{formatName(pokemon.name)}</Text>
    </View>
  );
}

function getStatValue(stats: PokemonStat[], statName: string): number {
  return stats.find((stat) => stat.name === statName)?.baseStat ?? 0;
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 18,
    marginTop: 6,
  },
  selectorBlock: {
    marginBottom: 14,
  },
  selectorLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  selectorList: {
    gap: 10,
    paddingRight: 8,
  },
  selectorChip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 102,
    padding: 10,
    width: 104,
  },
  selectorChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectorImage: {
    height: 54,
    width: 54,
  },
  selectorText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 6,
    textAlign: 'center',
  },
  selectorTextActive: {
    color: colors.surface,
  },
  warning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
  },
  warningText: {
    color: '#92400E',
    fontWeight: '800',
    textAlign: 'center',
  },
  compareCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginTop: 10,
    padding: 14,
  },
  compareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pokemonHeader: {
    alignItems: 'center',
    flex: 1,
  },
  headerImage: {
    height: 86,
    width: 86,
  },
  headerName: {
    color: colors.text,
    fontWeight: '900',
    maxWidth: 130,
    textAlign: 'center',
  },
});
