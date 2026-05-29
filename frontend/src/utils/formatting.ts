export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export function formatName(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatHeight(height: number): string {
  return `${(height / 10).toFixed(1)} m`;
}

export function formatWeight(weight: number): string {
  return `${(weight / 10).toFixed(1)} kg`;
}

export function formatStatName(name: string): string {
  const labels: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
    speed: 'Speed',
  };

  return labels[name] ?? formatName(name);
}
