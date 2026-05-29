import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';

export function NotFoundPage() {
  return (
    <section className="page-section">
      <EmptyState title="Ruta no encontrada" message="La página solicitada no existe." />
      <Link className="button" to="/">
        Ir al inicio
      </Link>
    </section>
  );
}
