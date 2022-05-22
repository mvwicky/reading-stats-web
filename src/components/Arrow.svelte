<svelte:options namespace="svg" />

<script lang="ts">
  export let size: number | string = 24;
  export let hide: boolean = false;
  export let dir: "up" | "down" = "up";
</script>

<style>
  svg {
    vertical-align: -0.125rem;
    transition: transform 200ms linear 0s;
  }
  svg.down {
    transform: rotate3d(0, 0, 1, 180deg);
  }
</style>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class:up={dir === "up"}
  class:down={dir === "down"}
>
  {#if !hide}
    <polyline points="18 15 12 9 6 15" />
  {/if}
</svg>
