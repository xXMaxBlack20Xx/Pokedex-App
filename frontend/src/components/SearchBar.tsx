import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar Pokémon por nombre...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8793a3"
          returnKeyType="search"
          style={styles.input}
          value={value}
        />
        {value.length > 0 && (
          <Pressable
            hitSlop={8}
            onPress={() => onChangeText('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>{'\u2715'}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    color: '#17202b',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 36,
    paddingRight: 12,
  },
  clearText: {
    color: '#8793a3',
    fontSize: 15,
    fontWeight: '700',
  },
});
