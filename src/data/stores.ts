import { differenceInDays, format, isBefore } from "date-fns";
import type { Readable } from "svelte/store";
import { derived, writable } from "svelte/store";

import type { Book, Stat } from "../types";
import { ppdFmt, wholeNumFmt } from "../utils/fmt";
import { augmentBook } from "./augment";

export const books = writable<Book[]>([]);

export const stats = derived<Readable<Book[]>, Stat[]>(books, ($books) => {
  console.log("Recalculating stats", $books.length);
  let totalPagesRead = 0;
  let [ppdSum, ppdDen] = [0, 0];
  let finished = 0;
  let daysSum = 0;
  let earliest = new Date();

  for (const book of $books) {
    const aug = augmentBook(book);
    totalPagesRead += book.pages_read;
    if (aug.pages_per_day !== null) {
      ppdSum += aug.pages_per_day;
      ppdDen += 1;
    }
    if (aug.pct === 1) {
      finished += 1;
      daysSum += aug.days ?? 0;
    }
    if (book.started && isBefore(book.started, earliest)) {
      earliest = book.started;
    }
  }
  const stats: Stat[] = [
    {
      name: "Total Pages Read",
      value: totalPagesRead,
      formatter: wholeNumFmt,
    },
    {
      name: "Average Pages per Day",
      value: ppdDen > 0 ? ppdSum / ppdDen : 0,
      formatter: ppdFmt,
    },
    { name: "Books Finished", value: finished, formatter: wholeNumFmt },
    {
      name: "Average Days per Book",
      value: finished > 0 ? daysSum / finished : 0,
      formatter: ppdFmt,
    },
    { name: "Median Days per Book", value: 8, formatter: wholeNumFmt },
    {
      name: "Total Days Tracked",
      value: differenceInDays(new Date(), earliest),
      formatter: wholeNumFmt,
    },
    { name: "Median Pages per Day", value: 51.33, formatter: ppdFmt },
    {
      name: "Earliest Date",
      value: earliest.valueOf(),
      formatter: (v) => format(v, "yyyy-MM-dd"),
    },
  ];
  return stats;
});
