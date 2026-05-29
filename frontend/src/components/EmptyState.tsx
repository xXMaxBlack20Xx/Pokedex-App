interface EmptyStateProps {
  message?: string;
  title?: string;
}

export function EmptyState({
  message = 'No hay Pokémon disponibles.',
  title = 'Sin resultados',
}: EmptyStateProps) {
  return (
    <section className="state-card">
      <strong>{title}</strong>
      <p>{message}</p>
    </section>
  );
}
