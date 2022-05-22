<script lang="ts">
  import { books } from "../data/stores";
  import { columns } from "../table-def";
  import type { AugBook, SortDir } from "../types";
  import Arrow from "./Arrow.svelte";
  import Row from "./Row.svelte";

  const arrowSize = 14;

  let sortedCol: number | null = null;
  let sortDir: SortDir = "asc";

  $: dir = (sortDir === "asc" ? "up" : "down") as "up" | "down";

  // function sortBooks(col: keyof AugBook, d: SortDir) {}

  function makeHeaderClick(i: number) {
    return function (this: HTMLTableCellElement) {
      const { field } = columns[i];
      if (!field) {
        return;
      }
      if (sortedCol === i) {
        sortDir = sortDir === "asc" ? "desc" : "asc";
      }
      // $books.sort()
      sortedCol = i;
      console.log(this.cellIndex);
    };
  }

  function makeReadChange(i: number) {
    return () => {
      console.log(i, $books[i]);
    };
  }
</script>

<style>
  th {
    font-size: 0.9rem;
  }
  thead {
    background-color: var(--bg-dark);
  }
  table {
    border-collapse: collapse;
    text-align: left;
    border: 1px solid var(--border-dark);
    table-layout: fixed;
    /* width: 100%; */
  }
  th.sortable {
    cursor: pointer;
  }
  th + th {
    border-left: 1px solid var(--border-dark);
  }
  thead th {
    vertical-align: bottom;
    border-bottom: 2px solid var(--border-dark);
    border-top: none;
  }
</style>

{#if $books.length > 0}
  <table class="data-table">
    <thead>
      <tr>
        {#each columns as col, i}
          {@const sortable = col.field !== undefined}
          <th
            scope="col"
            class:sortable
            on:click={sortable ? makeHeaderClick(i) : undefined}
          >
            {col.title}
            {#if sortable}
              <Arrow size={arrowSize} hide={i !== sortedCol} {dir} />
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each $books as book, i (book.id)}
        <Row {book} on:readchange={makeReadChange(i)} />
      {/each}
    </tbody>
  </table>
{/if}
