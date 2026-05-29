import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  compact?: boolean;
}

export function FavoriteButton({ isFavorite, onPress, compact = false }: FavoriteButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      onPress={onPress}
      style={[styles.button, isFavorite && styles.active, compact && styles.compact]}
    >
      <Text style={[styles.text, isFavorite && styles.activeText]}>
        {isFavorite ? 'Favorito' : 'Guardar'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  active: {
    backgroundColor: colors.primary,
  },
  compact: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  activeText: {
    color: colors.surface,
  },
});
