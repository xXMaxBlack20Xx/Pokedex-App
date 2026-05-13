import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PaginationBarProps {
  page: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export function PaginationBar({
  page,
  totalPages,
  canGoNext,
  canGoPrevious,
  isLoading,
  onNext,
  onPrevious,
}: PaginationBarProps) {
  const previousDisabled = isLoading || !canGoPrevious;
  const nextDisabled = isLoading || !canGoNext;

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        disabled={previousDisabled}
        onPress={onPrevious}
        style={[styles.button, previousDisabled && styles.buttonDisabled]}
      >
        <Text
          style={[
            styles.buttonText,
            previousDisabled && styles.buttonTextDisabled,
          ]}
        >
          Anterior
        </Text>
      </Pressable>

      <View style={styles.pageIndicator}>
        <Text style={styles.pageText}>Página</Text>
        <Text style={styles.pageNumber}>
          {page} / {Math.max(totalPages, 1)}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={nextDisabled}
        onPress={onNext}
        style={[styles.button, nextDisabled && styles.buttonDisabled]}
      >
        <Text
          style={[styles.buttonText, nextDisabled && styles.buttonTextDisabled]}
        >
          Siguiente
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopColor: '#d8e0ea',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#c83642',
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  buttonDisabled: {
    backgroundColor: '#e8edf3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  buttonTextDisabled: {
    color: '#8793a3',
  },
  pageIndicator: {
    alignItems: 'center',
    minWidth: 82,
  },
  pageText: {
    color: '#596579',
    fontSize: 11,
    fontWeight: '700',
  },
  pageNumber: {
    color: '#17202b',
    fontSize: 15,
    fontWeight: '900',
  },
});
