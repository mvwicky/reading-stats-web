import { parse } from "date-fns";
import localforage from "localforage";

import readingData from "./reading-data-short.json";

const READING_DATA_KEY = "reading-data";

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

const DATE_FMT = "yyyy-MM-dd";

const STORE_VERSION = 3;
const STORAGE = localforage.createInstance({
  name: "reading-stats",
  version: STORE_VERSION,
});
const VERSION_KEY = "store-version";

async function storageReady(): Promise<void> {
  await STORAGE.ready();
  const storedVersion = await STORAGE.getItem<number>(VERSION_KEY);
  if (storedVersion !== STORE_VERSION) {
    await STORAGE.clear();
    await STORAGE.setItem(VERSION_KEY, STORE_VERSION);
  }
}

function parseDate(dateStr: string): Date {
  return parse(dateStr, DATE_FMT, new Date());
}

export async function getBooks(): Promise<BookData> {
  await storageReady();
  let savedData = await STORAGE.getItem<BookData>(READING_DATA_KEY);
  if (savedData === null) {
    const data: Book[] = [];
    console.log("Saving data");
    for (const {
      started: startStr,
      finished: finishedStr,
      ...book
    } of readingData.books) {
      const started = !startStr ? null : parseDate(startStr);
      const finished = !finishedStr ? null : parseDate(finishedStr);

      data.push({ id: data.length, started, finished, ...book });
    }
    savedData = { books: data };
    await STORAGE.setItem(READING_DATA_KEY, savedData);
  } else {
    console.log(`Data found in ${STORAGE.driver()}`);
  }
  return savedData;
}

// export function bookId(book: Book) {}

// export function updateBook(data, book) {}
