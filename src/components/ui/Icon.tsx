type Name = 'arrow' | 'phone' | 'pin' | 'clock' | 'check' | 'star' | 'plus' | 'close' | 'menu' | 'arrow-down' | 'chevron' | 'route' | 'up-right';

const P: Record<Name, string> = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  'up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-down': 'M12 4v15m-6-6 6 6 6-6',
  phone: 'M5 4h3.5l1.7 4.2-2.2 1.4a11 11 0 0 0 5.4 5.4l1.4-2.2L19 14.5V18a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2Z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-8.3a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  star: 'm12 3.6 2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.9l6-.8Z',
  plus: 'M12 5v14M5 12h14',
  close: 'M6 6l12 12M18 6 6 18',
  menu: 'M4 8h16M4 16h16',
  chevron: 'm7 10 5 5 5-5',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h5a4 4 0 0 0 0-8h-2',
};

export function Icon({ name, className = 'h-5 w-5', fill = false }: { name: Name; className?: string; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={P[name]} />
    </svg>
  );
}
