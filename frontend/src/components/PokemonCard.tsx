import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PokemonListItem, PokemonFavorite } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onPress: (pokemon: PokemonListItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: PokemonFavorite) => void;
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

export function PokemonCard({
  pokemon,
  onPress,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const favoriteData: PokemonFavorite = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
    addedAt: Date.now(),
  };

  return (
    <Pressable onPress={() => onPress(pokemon)} style={styles.card}>
      <View style={styles.cardInner}>
        <View style={styles.header}>
          <Text style={styles.number}>
            #{pokemon.id.toString().padStart(3, '0')}
          </Text>
          <Pressable
            hitSlop={12}
            onPress={() => onToggleFavorite(favoriteData)}
            style={styles.favoriteButton}
          >
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
              {isFavorite ? '\u2665' : '\u2661'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {formatPokemonName(pokemon.name)}
        </Text>

        <View style={styles.imageContainer}>
          {pokemon.image ? (
            <Image
              accessibilityLabel={pokemon.name}
              resizeMode="contain"
              source={{ uri: pokemon.image }}
              style={styles.image}
            />
          ) : null}
        </View>

        <View style={styles.types}>
          {pokemon.types.map((type) => {
            const color = TYPE_COLORS[type] ?? '#8793a3';
            return (
              <View
                key={type}
                style={[styles.typeBadge, { backgroundColor: color + '20' }]}
              >
                <Text style={[styles.typeText, { color }]}>{type}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
}

function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  cardInner: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    gap: 10,
    minHeight: 262,
    padding: 14,
    shadowColor: '#1f2a37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    color: '#c83642',
    fontSize: 13,
    fontWeight: '800',
  },
  favoriteButton: {
    minHeight: 28,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    color: '#cbd5e1',
    fontSize: 20,
  },
  favoriteIconActive: {
    color: '#ef4444',
  },
  name: {
    color: '#17202b',
    fontSize: 17,
    fontWeight: '800',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    minHeight: 26,
  },
  typeBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});
