export interface ColumnDef {
  title: string;
  sortable?: boolean;
}

export const columns: Readonly<ColumnDef[]> = [
  { title: "Title" },
  { title: "Author" },
  { title: "Year" },
  { title: "Pages Read" },
  { title: "Total Pages" },
  { title: "%", sortable: false },
  { title: "Started" },
  { title: "Finished" },
  { title: "Days" },
  { title: "Pages/Day" },
] as const;
