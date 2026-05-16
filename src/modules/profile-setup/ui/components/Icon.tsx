import styles from './Icon.module.css';

export type IconName =
  | 'activity'
  | 'arrow-left'
  | 'arrow-right'
  | 'calendar'
  | 'check'
  | 'id-card'
  | 'info'
  | 'mail'
  | 'map-pin'
  | 'message'
  | 'music'
  | 'repeat'
  | 'send'
  | 'shield'
  | 'sparkles'
  | 'target'
  | 'user'
  | 'users'
  | 'x';

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg aria-hidden="true" className={[styles.icon, className].filter(Boolean).join(' ')} fill="none" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

const strokeProps = {
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.9,
};

const paths: Record<IconName, React.ReactNode> = {
  activity: <path {...strokeProps} d="M4 14s2-4 4-4 2 4 4 4 2-4 4-4 4 4 4 4" />,
  'arrow-left': <path {...strokeProps} d="M19 12H5m0 0 5-5m-5 5 5 5" />,
  'arrow-right': <path {...strokeProps} d="M5 12h14m0 0-5-5m5 5-5 5" />,
  calendar: <path {...strokeProps} d="M7 3v3m10-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
  check: <path {...strokeProps} d="m5 13 4 4L19 7" />,
  'id-card': <path {...strokeProps} d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm4 5h5M8 15h8m0-5h.01" />,
  info: <path {...strokeProps} d="M12 17v-6m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  mail: <path {...strokeProps} d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm1 1 7 5 7-5" />,
  'map-pin': <path {...strokeProps} d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  message: <path {...strokeProps} d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
  music: <path {...strokeProps} d="M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm10-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" />,
  repeat: <path {...strokeProps} d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" />,
  send: <path {...strokeProps} d="m22 2-7 20-4-9-9-4 20-7Z" />,
  shield: <path {...strokeProps} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  sparkles: <path {...strokeProps} d="m12 3 1.4 4.1L17.5 8l-4.1 1.4L12 13.5l-1.4-4.1L6.5 8l4.1-1.4L12 3Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13ZM6 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" />,
  target: <path {...strokeProps} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  user: <path {...strokeProps} d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />,
  users: <path {...strokeProps} d="M17 21a5 5 0 0 0-10 0m10 0a5 5 0 0 1 4 0M7 21a5 5 0 0 0-4 0m12-11a4 4 0 1 1-6 0 4 4 0 0 1 6 0Zm5 3a3 3 0 0 0-3-5m-10 5a3 3 0 0 1 3-5" />,
  x: <path {...strokeProps} d="m6 6 12 12M18 6 6 18" />,
};
