interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Cargando Pokémon...' }: LoadingStateProps) {
  return (
    <section className="state-card" role="status" aria-live="polite">
      <span className="loader" aria-hidden="true" />
      <p>{message}</p>
    </section>
  );
}
