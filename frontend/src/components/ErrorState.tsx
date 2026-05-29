interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Ocurrió un error inesperado.',
  onRetry,
}: ErrorStateProps) {
  return (
    <section className="state-card state-card--error" role="alert">
      <strong>Ocurrió un problema</strong>
      <p>{message}</p>
      {onRetry ? (
        <button className="button button--secondary" type="button" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </section>
  );
}
