import { formatStatName } from '../utils/formatting';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
  highlight?: 'left' | 'right' | 'tie' | 'none';
}

export function StatBar({ name, value, maxValue = 180, highlight = 'none' }: StatBarProps) {
  const width = Math.max(4, Math.min(100, (value / maxValue) * 100));

  return (
    <div className={`stat-row stat-row--${highlight}`}>
      <span className="stat-name">{formatStatName(name)}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-track" aria-hidden="true">
        <span className="stat-fill" style={{ width: `${width}%` }} />
      </span>
    </div>
  );
}
