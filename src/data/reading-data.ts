import { parseDate } from "../dt";
import type { Book, BookData, RawBook } from "../types";
import { db } from "./db";

async function loadDefaultData(): Promise<{ books: RawBook[] }> {
  if (import.meta.env.MODE !== "production") {
    const { default: rdr } = await import("./reading-data-short.json");
    return rdr as { books: RawBook[] };
  }
  return { books: [] };
}

export function bookProxy(book: Book) {
  const { id } = book;
  const handler: ProxyHandler<Book> = {
    set: function (target, p, value, receiver) {
      console.log(id, p, value);
      const r = Reflect.set(target, p, value, receiver);
      db.then((d) => d.put("books", target));
      return r;
    },
  };
  return new Proxy(book, handler);
}

export async function getBooks(): Promise<BookData> {
  const books = await (await db).getAll("books");
  if (!books.length) {
    const readingData = await loadDefaultData();
    const tx = (await db).transaction("books", "readwrite");
    console.log("Saving data");
    const addPromises: Promise<unknown>[] = [];
    for (const {
      started: startStr,
      finished: finishedStr,
      ...book
    } of readingData.books) {
      const started = !startStr ? null : parseDate(startStr);
      const finished = !finishedStr ? null : parseDate(finishedStr);
      const realBook = { id: books.length, started, finished, ...book };
      books.push(realBook);
      addPromises.push(tx.store.add(realBook));
    }
    await Promise.all(addPromises.concat([tx.done]));
  } else {
    console.log(`Data found`);
  }
  return { books: books.map(bookProxy) };
}
