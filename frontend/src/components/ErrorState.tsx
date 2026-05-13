import { StyleSheet, Text, View } from 'react-native';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff4f5',
    borderColor: '#f4b6bd',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  message: {
    color: '#a12b35',
    fontSize: 16,
    fontWeight: '700',
  },
});
