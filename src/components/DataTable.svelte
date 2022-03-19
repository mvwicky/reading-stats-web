<script lang="ts">
  import { books } from "../data/stores";
  import { columns } from "../table-def";
  import Arrow from "./Arrow.svelte";
  import Row from "./Row.svelte";

  let sortedCol: number | null = null;

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
    background-color: hsl(210, 16%, 93%);
  }
  table {
    border-collapse: collapse;
    text-align: left;
    border: 1px solid hsl(210, 14%, 75%);
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
    border-top: none;
  }
</style>

{#if $books.length > 0}
  <table class="data-table">
    <thead>
      <tr>
        {#each columns as { title, sortable }, i}
          <th scope="col" class:sortable={sortable ?? true}>
            {title}
            <Arrow size="14" hide={i !== sortedCol} />
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
