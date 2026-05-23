import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

interface TypeFilterProps {
  types: { name: string }[];
  selectedType: string;
  onSelectType: (type: string) => void;
  isLoading?: boolean;
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

export function TypeFilter({
  types,
  selectedType,
  onSelectType,
  isLoading,
}: TypeFilterProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {isLoading && types.length === 0 ? (
        <ActivityIndicator color="#c83642" size="small" />
      ) : null}

      <Pressable
        onPress={() => onSelectType('')}
        style={[
          styles.chip,
          styles.chipUnselected,
          selectedType === '' && styles.chipSelectedAll,
        ]}
      >
        <Text
          style={[
            styles.chipText,
            styles.chipTextUnselected,
            selectedType === '' && styles.chipTextSelectedAll,
          ]}
        >
          Todos
        </Text>
      </Pressable>

      {types.map((type) => {
        const isSelected = selectedType === type.name;
        const color = TYPE_COLORS[type.name] ?? '#8793a3';
        return (
          <Pressable
            key={type.name}
            onPress={() => onSelectType(type.name)}
            style={[
              styles.chip,
              styles.chipUnselected,
              isSelected && { backgroundColor: color, borderColor: color },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                styles.chipTextUnselected,
                isSelected && styles.chipTextSelected,
              ]}
            >
              {type.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const CHIP_HEIGHT = 36;
const CHIP_PADDING = 14;
const CHIP_FONT_SIZE = 13;
const CHIP_BORDER = 1;

const styles = StyleSheet.create({
  scroll: {
    maxHeight: CHIP_HEIGHT + CHIP_PADDING * 2 + CHIP_BORDER * 2 + 16,
    minHeight: CHIP_HEIGHT + CHIP_PADDING * 2 + CHIP_BORDER * 2 + 16,
  },
  content: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  chip: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: CHIP_HEIGHT,
    paddingHorizontal: CHIP_PADDING,
  },
  chipUnselected: {
    backgroundColor: '#e8edf3',
    borderColor: 'transparent',
    borderWidth: CHIP_BORDER,
  },
  chipSelectedAll: {
    backgroundColor: '#17202b',
    borderColor: '#17202b',
  },
  chipText: {
    fontSize: CHIP_FONT_SIZE,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  chipTextUnselected: {
    color: '#596579',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  chipTextSelectedAll: {
    color: '#ffffff',
  },
});
