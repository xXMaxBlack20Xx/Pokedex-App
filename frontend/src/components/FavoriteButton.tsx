interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  label: string;
}

export function FavoriteButton({ isFavorite, onClick, label }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={isFavorite ? 'favorite-button favorite-button--active' : 'favorite-button'}
      aria-label={label}
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
}
