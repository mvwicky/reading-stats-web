<script lang="ts">
  import { onDestroy } from "svelte";

  import { stats } from "../data/stores";
  import Modal from "./Modal.svelte";

  const previouslyFocused =
    typeof document !== "undefined" && document.activeElement;
  if (previouslyFocused) {
    onDestroy(() => (previouslyFocused as HTMLElement).focus());
  }
</script>

<style>
  table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
    border: 1px solid var(--border-light);
  }
  th {
    font-size: 0.9rem;
    border-right: 2px solid var(--border-dark);
    background-color: var(--bg-dark);
  }
</style>

<Modal on:close>
  <h2>Stats</h2>
  <table>
    <tbody>
      {#each $stats as { name, value, formatter }}
        <tr>
          <th scope="row">{name}</th>
          <td>{formatter ? formatter(value) : value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</Modal>
