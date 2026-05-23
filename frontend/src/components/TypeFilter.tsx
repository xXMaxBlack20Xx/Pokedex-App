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
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {isLoading && types.length === 0 ? (
        <ActivityIndicator color="#c83642" size="small" />
      ) : null}

      <Pressable
        onPress={() => onSelectType('')}
        style={[
          styles.chip,
          selectedType === '' && styles.chipSelected,
          selectedType === '' && { backgroundColor: '#17202b' },
        ]}
      >
        <Text
          style={[
            styles.chipText,
            selectedType === '' && styles.chipTextSelected,
          ]}
        >
          Todos
        </Text>
      </Pressable>

      {types.map((type) => {
        const isSelected = selectedType === type.name;
        const bgColor = TYPE_COLORS[type.name] ?? '#8793a3';
        return (
          <Pressable
            key={type.name}
            onPress={() => onSelectType(type.name)}
            style={[
              styles.chip,
              isSelected && styles.chipSelected,
              { backgroundColor: bgColor + '20' },
              isSelected && { backgroundColor: bgColor },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: bgColor },
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

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    borderWidth: 0,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
});
