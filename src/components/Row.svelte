<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { format } from "date-fns";
  import type { Book } from "../data/reading-data";
  export let book: Book;

  const pctFmt = new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
  const dispatch = createEventDispatcher();

  const readChange = () => dispatch("readchange", book.pages_read);

  function pgReadChange(event: Event) {
    console.log(event);
  }
</script>

<style>
  td {
    font-size: 0.7rem;
  }
  td:first-child {
    font-weight: 700;
  }
  td + td {
    border-left: 1px solid #dee2e6;
  }
  /* input {
    max-width: 6em;
  }
  input[type="date"] {
    max-width: 8em;
  } */
</style>

<tr>
  <td>{book.title}</td>
  <td>{book.author}</td>
  <td>{book.year}</td>
  <td>
    <input
      type="number"
      bind:value={book.pages_read}
      max={book.total_pages}
      on:change={readChange}
    />
  </td>
  <td>{book.total_pages}</td>
  <td>{pctFmt.format(book.pages_read / book.total_pages)}</td>
  <td>
    {#if book.started}
      {format(book.started, "yyyy-MM-dd")}
    {:else}
      <input type="date" />
    {/if}
  </td>
  <td>
    {#if book.finished}
      {format(book.finished, "yyyy-MM-dd")}
    {:else if book.started}
      <input type="date" />
    {/if}
  </td>
</tr>
