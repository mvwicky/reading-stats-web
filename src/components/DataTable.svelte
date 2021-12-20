<script lang="ts">
  import type { Book } from "../types";
  import { columns } from "../table-def";

  import Row from "./Row.svelte";

  export let books: Book[];

  function makeReadChange(i: number) {
    return () => {
      console.log(i, books[i]);
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
    table-layout: fixed;
  }
  th.sortable {
    cursor: pointer;
  }
  th + th {
    border-left: 1px solid hsl(210, 14%, 79%);
  }
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid hsl(210, 14%, 68%);
  }
</style>

{#if books.length > 0}
  <table class="data-table">
    <thead>
      <tr>
        {#each columns as { title, sortable }}
          <th scope="col" class:sortable={sortable ?? true}>
            {title}
            {#if sortable ?? true}
              <small>(s)</small>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each books as book, i (book.id)}
        <Row {book} on:readchange={makeReadChange(i)} />
      {/each}
    </tbody>
  </table>
{/if}
