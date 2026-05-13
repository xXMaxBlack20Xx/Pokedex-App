import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#c83642" size="large" />
      <Text style={styles.message}>Cargando Pokémon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 32,
  },
  message: {
    color: '#596579',
    fontSize: 16,
    fontWeight: '700',
  },
});
