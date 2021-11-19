import { writable } from "svelte/store";
import type { Book } from "./reading-data";

export const books = writable<Book[]>([]);
