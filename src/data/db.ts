import type { DBSchema, IDBPDatabase } from "idb";
import { openDB } from "idb";

import type { Book } from "../types";

interface Schema extends DBSchema {
  books: {
    value: Book;
    key: string;
  };
}

const DB_NAME = "Books";
const DB_VERSION = 1;

export async function createDB(): Promise<IDBPDatabase<Schema>> {
  const db = await openDB<Schema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore("books", { autoIncrement: true, keyPath: "id" });
    },
  });
  return db;
}

const db = createDB();

export { db };
