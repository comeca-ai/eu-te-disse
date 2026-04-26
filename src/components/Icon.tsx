import type { ReactElement } from "react";

export type IconName =
  | "search" | "home" | "trending" | "flame" | "bookmark" | "star" | "wallet"
  | "user" | "bell" | "settings" | "chart" | "clock" | "arrow" | "plus" | "minus"
  | "close" | "check" | "menu" | "chevron" | "chevDown" | "info" | "share"
  | "flag" | "grid" | "list" | "bolt" | "activity" | "book" | "trophy" | "globe"
  | "eye" | "download" | "arrowUp" | "arrowDown";

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}

const PATHS: Record<IconName, ReactElement> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  home: (<path d="M3 11 12 4l9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />),
  trending: (<><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></>),
  flame: (<path d="M12 22c4 0 7-2.5 7-7 0-3-2-5-3-7-1 2-2 3-3 3-2 0-2-2-2-4-3 2-6 5-6 9 0 4 3 6 7 6Z" />),
  bookmark: (<path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />),
  star: (<path d="m12 2 3 7 7 .5-5.5 4.5L18 22l-6-4-6 4 1.5-8L2 9.5 9 9z" />),
  wallet: (<><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M16 12h2" /><path d="M2 10h20" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>),
  settings: (<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>),
  chart: (<><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 6-7" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  arrow: (<path d="M5 12h14M13 5l7 7-7 7" />),
  plus: (<path d="M12 5v14M5 12h14" />),
  minus: (<path d="M5 12h14" />),
  close: (<path d="M18 6 6 18M6 6l18 18" />),
  check: (<path d="m5 13 4 4L19 7" />),
  menu: (<path d="M4 6h16M4 12h16M4 18h16" />),
  chevron: (<path d="m9 6 6 6-6 6" />),
  chevDown: (<path d="m6 9 6 6 6-6" />),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 8v.01M11 12h1v4h1" /></>),
  share: (<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" /></>),
  flag: (<><path d="M4 22V4" /><path d="M4 4h13l-2 4 2 4H4" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
  list: (<><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="3" cy="6" r="1" fill="currentColor" /><circle cx="3" cy="12" r="1" fill="currentColor" /><circle cx="3" cy="18" r="1" fill="currentColor" /></>),
  bolt: (<path d="m13 2-9 13h7l-1 7 9-13h-7z" />),
  activity: (<path d="M22 12h-4l-3 9-6-18-3 9H2" />),
  book: (<><path d="M4 4h12a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" /><path d="M4 4v15h13" /></>),
  trophy: (<><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></>),
  eye: (<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>),
  download: (<><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 21h14" /></>),
  arrowUp: (<path d="m5 12 7-7 7 7M12 19V5" />),
  arrowDown: (<path d="m19 12-7 7-7-7M12 5v14" />)
};

export function Icon({ name, size = 18, stroke = 1.6, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
