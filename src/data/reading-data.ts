import localforage from "localforage";

import { parseDate } from "../dt";
import type { BookData, Book, RawBook } from "../types";

const READING_DATA_KEY = "reading-data";
const STORE_VERSION = 5;
const VERSION_KEY = "store-version";

const STORAGE = localforage.createInstance({
  name: "reading-stats",
  version: STORE_VERSION,
});

async function storageReady(): Promise<void> {
  await STORAGE.ready();
  const storedVersion = await STORAGE.getItem<number>(VERSION_KEY);
  if (storedVersion !== STORE_VERSION) {
    console.log(`Clearing outdated data: ${storedVersion} < ${STORE_VERSION}`);
    await STORAGE.clear();
    await STORAGE.setItem(VERSION_KEY, STORE_VERSION);
  }
}

// const bookHandler: ProxyHandler<Book> = {
//   get: function (target, p, receiver) {
//     return Reflect.get(target, p, receiver);
//   },
//   set: function(target, p, value, receiver) {
//     return Reflect.set(target, p, value, receiver)
//   }
// };

async function loadDefaultData(): Promise<{ books: RawBook[] }> {
  if (import.meta.env.SNOWPACK_PUBLIC_USE_DEFAULT_DATA) {
    const { default: rdr } = await import("./reading-data-short.json");
    return rdr as { books: RawBook[] };
  }
  return { books: [] };
}

function makeProxyHandler(
  booksData: Book[],
  book: Book,
  i: number
): ProxyHandler<Book> {
  return {
    get: function (target, p, receiver) {
      return Reflect.get(target, p, receiver);
    },
    set: function (target, p, value, receiver) {
      return Reflect.set(target, p, value, receiver);
    },
  };
}

// export function bookId(book: Book) {}

export function bookStorageKey(book: Book): string {
  return `${READING_DATA_KEY}-${book.id}`;
}

export async function getBooks(): Promise<BookData> {
  await storageReady();
  let savedData = await STORAGE.getItem<BookData>(READING_DATA_KEY);
  if (!savedData) {
    const readingData = await loadDefaultData();
    const data: Book[] = [];
    console.log("Saving data");
    for (const {
      started: startStr,
      finished: finishedStr,
      ...book
    } of readingData.books) {
      const started = !startStr ? null : parseDate(startStr);
      const finished = !finishedStr ? null : parseDate(finishedStr);
      const realBook: Book = { id: data.length, started, finished, ...book };
      data.push(realBook);
    }
    savedData = { books: data };
    await STORAGE.setItem(READING_DATA_KEY, savedData);
  } else {
    console.log(`Data found in ${STORAGE.driver()}`);
  }
  const proxiedBooks = savedData.books.map(
    (book, index, arr) => new Proxy(book, makeProxyHandler(arr, book, index))
  );
  return { books: proxiedBooks };
}

// export function updateBook(data, book) {}
