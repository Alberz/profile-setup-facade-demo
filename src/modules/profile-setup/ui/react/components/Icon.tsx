import styles from '../../shared/styles/Icon.module.css';
import { iconPaths, type IconName } from '../../shared/icon-paths';

const strokeProps = {
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.9,
};

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg aria-hidden="true" className={[styles.icon, className].filter(Boolean).join(' ')} fill="none" viewBox="0 0 24 24">
      {iconPaths[name].map((path) => (
        <path key={path} {...strokeProps} d={path} />
      ))}
    </svg>
  );
}

export type { IconName };
