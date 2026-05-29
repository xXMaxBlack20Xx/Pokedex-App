import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { FavoriteButton } from './FavoriteButton';
import type { FavoritePokemon, PokemonListItem } from '../types/pokemon';
import { formatName, formatPokemonId } from '../utils/formatting';
import { getTypeColor } from '../utils/typeColors';

interface PokemonCardProps {
  pokemon: PokemonListItem | FavoritePokemon;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function PokemonCard({ pokemon, isFavorite, onPress, onToggleFavorite }: PokemonCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.number}>{formatPokemonId(pokemon.id)}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {formatName(pokemon.name)}
        </Text>
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <View key={type.name} style={[styles.typeChip, { backgroundColor: getTypeColor(type.name) }]}>
              <Text style={styles.typeText}>{formatName(type.name)}</Text>
            </View>
          ))}
        </View>
      </View>
      <FavoriteButton compact isFavorite={isFavorite} onPress={onToggleFavorite} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  imageWrap: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    height: 76,
    justifyContent: 'center',
    marginRight: 12,
    width: 76,
  },
  image: {
    height: 68,
    width: 68,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  number: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  typeChip: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '800',
  },
});
