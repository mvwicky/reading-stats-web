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

export interface BookData {
  books: Book[];
}

export interface ColumnDef {
  title: string;
  sortable?: boolean;
}
