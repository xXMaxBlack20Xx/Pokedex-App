import { Image, StyleSheet, Text, View } from 'react-native';
import { PokemonListItem } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.number}>
          #{pokemon.id.toString().padStart(3, '0')}
        </Text>
        <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          accessibilityLabel={pokemon.name}
          resizeMode="contain"
          source={{ uri: pokemon.image }}
          style={styles.image}
        />
      </View>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <Text key={type} style={styles.type}>
            {type}
          </Text>
        ))}
      </View>
    </View>
  );
}

function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 14,
    minHeight: 262,
    padding: 16,
    shadowColor: '#1f2a37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  header: {
    gap: 6,
  },
  number: {
    color: '#c83642',
    fontSize: 13,
    fontWeight: '800',
  },
  name: {
    color: '#17202b',
    fontSize: 20,
    fontWeight: '800',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 118,
  },
  image: {
    height: 118,
    width: 118,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    minHeight: 28,
  },
  type: {
    backgroundColor: '#e8f3ee',
    borderRadius: 999,
    color: '#1f6b4d',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
