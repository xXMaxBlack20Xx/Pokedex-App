import { StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No hay Pokémon disponibles.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#d8e0ea',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  message: {
    color: '#596579',
    fontSize: 16,
    fontWeight: '700',
  },
});
