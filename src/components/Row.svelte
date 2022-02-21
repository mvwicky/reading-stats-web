<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { format } from "date-fns";
  import type { Book } from "../types";
  import { dateGuard, parseDate } from "../dt";

  export let book: Book;

  $: startedStr = dateGuard(book.started)
    ? format(book.started, "yyyy-MM-dd")
    : "";

  let finishedValue: string;
  let startedValue: string;

  const pctFmt = new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });

  const numFmt = new Intl.NumberFormat(undefined, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  const dispatch = createEventDispatcher<{ readchange: number }>();
  const readChange = () => dispatch("readchange", book.pages_read);

  function pgReadChange(event: Event) {
    console.log(event);
  }

  function onStartChange() {
    if (startedValue) {
      book.started = parseDate(startedValue);
    }
  }
  function onFinishChange() {
    if (finishedValue) {
      book.finished = parseDate(finishedValue);
    }
  }
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
    --ring-color: #00000000;
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
    --ring-color: #9ca3af;
    outline: none;
  }
</style>

<tr>
  <td><small>({book.id})</small> {book.title}</td>
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
      {book.pages_read}
    {/if}
  </td>
  <td>{numFmt.format(book.total_pages)}</td>
  <td>{pctFmt.format(book.pages_read / book.total_pages)}</td>
  <td>
    {#if book.started}
      {startedStr}
    {:else}
      <input type="date" bind:value={startedValue} on:change={onStartChange} />
    {/if}
  </td>
  <td>
    {#if book.finished}
      {format(book.finished, "yyyy-MM-dd")}
    {:else if book.started}
      <input
        type="date"
        bind:value={finishedValue}
        on:change={onFinishChange}
      />
    {/if}
  </td>
</tr>
