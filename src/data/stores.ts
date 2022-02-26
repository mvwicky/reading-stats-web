import { writable } from "svelte/store";

import type { Book } from "../types";

export const books = writable<Book[]>([]);
