import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import type { PokemonStat } from '../types/pokemon';
import { formatStatName } from '../utils/formatting';

interface StatBarProps {
  stat: PokemonStat;
  maxValue?: number;
}

export function StatBar({ stat, maxValue = 180 }: StatBarProps) {
  const width = `${Math.min(100, (stat.baseStat / maxValue) * 100)}%` as const;

  return (
    <View style={styles.row}>
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{formatStatName(stat.name)}</Text>
        <Text style={styles.value}>{stat.baseStat}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
  labelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: colors.text,
    fontWeight: '800',
  },
  value: {
    color: colors.textMuted,
    fontWeight: '800',
  },
  track: {
    backgroundColor: colors.statTrack,
    borderRadius: 999,
    height: 9,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 9,
  },
});
