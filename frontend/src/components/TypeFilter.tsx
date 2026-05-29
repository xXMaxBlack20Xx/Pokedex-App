import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import type { PokemonType } from '../types/pokemon';
import { formatName } from '../utils/formatting';
import { getTypeColor } from '../utils/typeColors';

interface TypeFilterProps {
  types: PokemonType[];
  selectedType: string;
  onSelectType: (type: string) => void;
}

export function TypeFilter({ types, selectedType, onSelectType }: TypeFilterProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onSelectType('')}
          style={[styles.chip, !selectedType && styles.clearActive]}
        >
          <Text style={[styles.chipText, !selectedType && styles.clearActiveText]}>Todos</Text>
        </Pressable>
        {types.map((type) => {
          const isSelected = selectedType === type.name;
          return (
            <Pressable
              accessibilityRole="button"
              key={type.name}
              onPress={() => onSelectType(type.name)}
              style={[
                styles.chip,
                { borderColor: getTypeColor(type.name) },
                isSelected && { backgroundColor: getTypeColor(type.name) },
              ]}
            >
              <Text style={[styles.chipText, isSelected && styles.selectedText]}>{formatName(type.name)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 46,
    marginBottom: 12,
  },
  content: {
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    minWidth: 78,
    paddingHorizontal: 14,
  },
  clearActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  chipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  clearActiveText: {
    color: colors.surface,
  },
  selectedText: {
    color: colors.surface,
  },
});
