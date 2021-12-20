<script lang="ts">
  let showAddModal = false;
  import { onMount } from "svelte";

  import AddBook from "./components/AddBook.svelte";
  import DataTable from "./components/DataTable.svelte";

  import { getBooks } from "./data/reading-data";
  import { books as booksStore } from "./data/stores";

  onMount(() => getBooks().then((data) => booksStore.set(data.books)));
</script>

<style>
  main {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.5rem 0.5rem 1rem;
  }
  @media (min-width: 1200px) {
    main {
      margin: 0.5rem 1rem 2rem;
    }
  }
  h1 {
    margin-bottom: 0;
  }
  .button-row {
    display: flex;
    justify-content: space-between;
  }
</style>

<main>
  <h1>Reading Stats</h1>
  <div class="button-row">
    <span>&nbsp;</span>
    <button id="add-button" on:click={() => (showAddModal = true)}
      >Add Book</button
    >
    <button id="reset-button">Reset</button>
  </div>
  <DataTable books={$booksStore} />
</main>
{#if showAddModal}
  <AddBook on:close={() => (showAddModal = false)} />
{/if}
