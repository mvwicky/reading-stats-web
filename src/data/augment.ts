import { differenceInDays } from "date-fns";

import type { AugBook, Book } from "../types";

export function augmentBook(book: Book): AugBook {
  const pct = book.pages_read / book.total_pages;
  const days: number | null = book.started
    ? differenceInDays(book.finished ?? new Date(), book.started) + 1
    : null;
  const pages_per_day: number | null =
    days !== null ? book.pages_read / days : null;
  return { ...book, pct, days, pages_per_day };
}
