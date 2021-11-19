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

export interface Book extends RawBook {
  id: number;
}

export interface BookData {
  books: Book[];
}

export async function getBooks(): Promise<BookData> {
  await localforage.ready();
  let savedData = await localforage.getItem<BookData>(READING_DATA_KEY);
  if (savedData === null) {
    const data: Book[] = [];
    console.log("Saving data");
    for (const book of readingData.books) {
      data.push({ id: data.length, ...book });
    }
    await localforage.setItem(READING_DATA_KEY, readingData);
    savedData = { books: data };
  } else {
    console.log(`Data found in ${localforage.driver()}`);
  }
  return savedData;
}

// export function bookId(book: Book) {}

// export function updateBook(data, book) {}
