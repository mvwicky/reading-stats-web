import type { ColumnDef } from "./types";

export const columns: Readonly<ColumnDef[]> = [
  { title: "Title" },
  { title: "Author" },
  { title: "Year" },
  { title: "Pages Read" },
  { title: "Total Pages" },
  { title: "%", sortable: false },
  { title: "Started" },
  { title: "Finished" },
] as const;
