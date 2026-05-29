import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { formatStatName } from '../utils/formatting';

interface CompareStatRowProps {
  statName: string;
  firstValue: number;
  secondValue: number;
}

export function CompareStatRow({ statName, firstValue, secondValue }: CompareStatRowProps) {
  const firstWins = firstValue > secondValue;
  const secondWins = secondValue > firstValue;

  return (
    <View style={styles.row}>
      <Text style={[styles.value, firstWins && styles.winner]}>{firstValue}</Text>
      <Text style={styles.label}>{formatStatName(statName)}</Text>
      <Text style={[styles.value, secondWins && styles.winner]}>{secondValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  value: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  winner: {
    color: colors.success,
  },
  label: {
    color: colors.text,
    flex: 1.4,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
});
