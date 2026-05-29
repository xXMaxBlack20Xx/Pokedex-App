interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar Pokémon por nombre...',
}: SearchBarProps) {
  return (
    <div className="field search-field">
      <label htmlFor="pokemon-search">Buscar</label>
      <div className="input-action">
        <input
          id="pokemon-search"
          type="search"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <button type="button" className="button button--ghost" onClick={() => onChange('')}>
            Limpiar
          </button>
        ) : null}
      </div>
    </div>
  );
}
