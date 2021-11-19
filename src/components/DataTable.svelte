<script lang="ts">
  import type { Book } from "src/data/reading-data";

  import Row from "./Row.svelte";
  import { books as booksStore } from "../data/stores";

  export let books: Book[];
  const columns = [
    "Title",
    "Author",
    "Year",
    "Pages Read",
    "Total Pages",
    "%",
    "Started",
    "Finished",
  ];
  function makeReadChange(i: number) {
    return () => {
      console.log(i, $booksStore[i]);
    };
  }
</script>

<style>
  th {
    font-size: 0.9rem;
  }
  thead {
    background-color: #e9ecef;
  }
  table {
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #dee2e6;
    border-top: none;
  }
  th + th {
    border-left: 1px solid hsl(210, 14%, 79%);
  }
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid hsl(210, 14%, 68%);
  }
</style>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each books as book, i}
      <Row {book} on:readchange={makeReadChange(i)} />
    {/each}
  </tbody>
</table>
