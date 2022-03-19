<script lang="ts">
  import { format } from "date-fns";
  import { createEventDispatcher } from "svelte";

  import { augmentBook } from "../data/augment";
  import type { Book } from "../types";
  import { dateGuard, parseDate } from "../utils/dt";
  import { pctFmt, ppdFmt, wholeNumFmt } from "../utils/fmt";

  export let book: Book;

  $: augBook = augmentBook(book);

  $: startedStr = dateGuard(book.started)
    ? format(book.started, "yyyy-MM-dd")
    : "";

  const dateValues: { finished: string; started: string } = {
    finished: "",
    started: "",
  };

  function onDateChange(name: "finished" | "started") {
    return () => {
      if (dateValues[name]) {
        book[name] = parseDate(dateValues[name]);
      }
    };
  }

  const dispatch = createEventDispatcher<{ readchange: number }>();
  const readChange = () => dispatch("readchange", book.pages_read);
</script>

<style>
  td {
    font-size: 0.75rem;
  }
  td:first-child {
    font-weight: 700;
  }
  td + td {
    border-left: 1px solid var(--border-light);
  }
  input {
    --ring-color: hsla(0, 0%, 0%, 0);
    border-radius: 4px;
    box-shadow: 0 0 0 2px var(--ring-color);
  }
  input[type="number"] {
    padding-right: 1em;
  }
  /* input:valid {
    --ring-color: var(--valid-color);
  } */
  input:invalid {
    --ring-color: var(--invalid-color);
  }
  input:focus-visible {
    --ring-color: hsl(218, 11%, 65%);
    outline: none;
  }
</style>

<tr>
  <td>{book.title}</td>
  <td>{book.author}</td>
  <td>{book.year}</td>
  <td>
    {#if book.started}
      <input
        type="number"
        bind:value={book.pages_read}
        max={book.total_pages}
        min="0"
        step="1"
        on:change={readChange}
      />
    {:else if book.finished}
      {wholeNumFmt(book.pages_read)}
    {/if}
  </td>
  <td>{wholeNumFmt(book.total_pages)}</td>
  <td>{pctFmt(augBook.pct)}</td>
  <td>
    {#if book.started}
      {startedStr}
    {:else}
      <input
        type="date"
        bind:value={dateValues.started}
        on:change={onDateChange("started")}
      />
    {/if}
  </td>
  <td>
    {#if book.finished}
      {format(book.finished, "yyyy-MM-dd")}
    {:else if book.started}
      <input
        type="date"
        bind:value={dateValues.finished}
        on:change={onDateChange("finished")}
      />
    {/if}
  </td>
  <td>
    {#if augBook.days !== null}{augBook.days}{/if}
  </td>
  <td>
    {#if augBook.pages_per_day !== null}{ppdFmt(augBook.pages_per_day)}{/if}
  </td>
</tr>
