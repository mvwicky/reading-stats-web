<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";

  import { bookProxy } from "../data/book-proxy";
  import { db } from "../data/db";
  import { books } from "../data/stores";
  import type { Book } from "../types";
  import { makeHandleKeydown } from "../utils/handle-keydown";

  interface PartialBook {
    title: string | undefined;
    author: string | undefined;
    year: number | undefined;
    total_pages: number | undefined;
  }

  function toBook(pBook: PartialBook, id: number): Book | null {
    const { title, author, year, total_pages } = pBook;
    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof year !== "number" ||
      typeof total_pages !== "number"
    ) {
      return null;
    }
    return {
      id,
      title,
      author,
      year,
      total_pages,
      pages_read: 0,
      off: null,
      finished: null,
      location: null,
      max_location: null,
      started: null,
    };
  }

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  const add = () => {
    if (bookValid) {
      books.update((b) => {
        const newBook = toBook(book, b.length + 1);
        if (newBook) {
          db.then((d) => d.add("books", newBook));
          return b.concat([bookProxy(newBook)]);
        }
        return b;
      });
    }
    close();
  };

  let modal: HTMLElement;

  const previouslyFocused =
    typeof document !== "undefined" && document.activeElement;
  if (previouslyFocused) {
    onDestroy(() => (previouslyFocused as HTMLElement).focus());
  }

  let book: PartialBook = {
    title: undefined,
    author: undefined,
    year: undefined,
    total_pages: undefined,
  };

  $: bookValid = toBook({ ...book }, 0) !== null;
</script>

<style>
  .modal-bg {
    background: hsla(0, 0%, 0%, 0.3);
    height: 100%;
    left: 0;
    margin: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: hsl(0, 0%, 100%);
  }
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .form-group + .form-group {
    margin-top: 1em;
  }
  button {
    display: block;
  }
  button[disabled] {
    color: #555;
    background-color: hsla(0, 0%, 50%, 0.522);
  }
  hr {
    height: 0;
    color: inherit;
  }
  .button-row {
    display: flex;
    justify-content: flex-end;
  }
  .button-row > * + * {
    margin-left: 1.5em;
  }
</style>

<svelte:window on:keydown={makeHandleKeydown(modal)} />

<div class="modal-bg" on:click={close} />
<div class="modal" aria-modal="true" bind:this={modal}>
  <h2>Add Book</h2>
  {#if bookValid}
    <p>
      {JSON.stringify(book, undefined, "  ")}
    </p>
  {/if}
  <hr />
  <form>
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" type="text" bind:value={book.title} />
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input id="author" type="text" bind:value={book.author} />
    </div>
    <div class="form-group">
      <label for="year">Year</label>
      <input id="year" type="number" bind:value={book.year} />
    </div>
    <div class="form-group">
      <label for="total-pages">Total Pages</label>
      <input
        id="total-pages"
        type="number"
        min="1"
        step="1"
        bind:value={book.total_pages}
      />
    </div>
  </form>
  <hr />
  <div class="button-row">
    <button on:click={close}>Close</button>
    <button tabindex={bookValid ? 0 : -1} disabled={!bookValid} on:click={add}
      >Add</button
    >
  </div>
</div>
