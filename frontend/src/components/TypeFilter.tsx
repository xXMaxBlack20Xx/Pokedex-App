import type { CSSProperties } from 'react';
import type { PokemonType } from '../types/pokemon';
import { TYPE_COLORS } from '../utils/pokemon';

interface TypeFilterProps {
  types: PokemonType[];
  selectedType: string;
  onSelectType: (type: string) => void;
  isLoading?: boolean;
}

export function TypeFilter({
  types,
  selectedType,
  onSelectType,
  isLoading,
}: TypeFilterProps) {
  return (
    <div className="type-filter" aria-label="Filtrar por tipo de Pokémon">
      <button
        type="button"
        className={selectedType ? 'type-chip' : 'type-chip type-chip--active'}
        onClick={() => onSelectType('')}
      >
        Todos
      </button>

      {types.map((type) => {
        const isSelected = selectedType === type.name;
        const color = TYPE_COLORS[type.name] ?? '#64748b';
        return (
          <button
            key={type.name}
            type="button"
            className={isSelected ? 'type-chip type-chip--active' : 'type-chip'}
            style={{ '--type-color': color } as CSSProperties}
            onClick={() => onSelectType(type.name)}
          >
            {type.name}
          </button>
        );
      })}

      {isLoading ? <span className="type-loading">Cargando tipos...</span> : null}
    </div>
  );
}
