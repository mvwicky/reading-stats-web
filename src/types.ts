type SnowpackEnvKey<K extends string> = `SNOWPACK_PUBLIC_${Uppercase<K>}`;
interface SnowpackEnv {
  MODE: string;
  NODE_ENV: string;
  [key: SnowpackEnvKey<string>]: string | undefined;
}

export interface RawBook {
  title: string;
  author: string;
  year: number;
  off: number | null;
  pages_read: number;
  total_pages: number;
  location: number | null;
  max_location: number | null;
  started: string | null;
  finished: string | null;
}

export interface Book extends Omit<RawBook, "started" | "finished"> {
  id: number;
  started: Date | null;
  finished: Date | null;
}

export interface AugBook extends Book {
  pct: number;
  days: number | null;
  pages_per_day: number | null;
}

export interface BookData {
  books: Book[];
}

export interface Stat {
  name: string;
  value: number;
  formatter?: (val: number) => string;
}
