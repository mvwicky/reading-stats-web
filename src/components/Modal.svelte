<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { makeHandleKeydown } from "../utils/handle-keydown";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal: HTMLElement;
</script>

<style>
  .modal-bg {
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    left: 0;
    margin: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: #fff;
  }
</style>

<svelte:window on:keydown={makeHandleKeydown(modal)} />

<div class="modal-bg" on:click={close} />
<div class="modal" aria-modal="true" bind:this={modal}>
  <slot />
</div>
