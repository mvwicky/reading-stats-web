import type { AugBook, Book } from "../types";
import { db } from "./db";
import { books } from "./stores";

export function bookProxy<B extends Book>(book: B) {
  const { id } = book;
  const handler: ProxyHandler<B> = {
    set: function (target, p, value, receiver) {
      console.log(id, p, value);
      const r = Reflect.set(target, p, value, receiver);
      db.then((d) => d.put("books", target)).then(() =>
        books.update((value) => value)
      );

      return r;
    },
  };
  return new Proxy(book, handler);
}
