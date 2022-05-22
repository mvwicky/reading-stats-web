import type { AugBook } from "./types";

export interface ColumnDef {
  title: string;
  field?: keyof AugBook;
}

export const columns: Readonly<ColumnDef[]> = [
  { title: "Title", field: "title" },
  { title: "Author", field: "author" },
  { title: "Year", field: "year" },
  { title: "Pages Read", field: "pages_read" },
  { title: "Total Pages", field: "total_pages" },
  { title: "%" },
  { title: "Started", field: "started" },
  { title: "Finished", field: "finished" },
  { title: "Days", field: "days" },
  { title: "Pages/Day", field: "pages_per_day" },
] as const;
