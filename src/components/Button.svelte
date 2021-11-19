<script>
  export let disabled = false;
</script>

<style>
  button {
    /* background: #ff3e00; */
    /* color: white; */
    /* border: none; */
    /* display: block; */
    padding: 0.5rem 0.75rem;
    border-radius: 2px;
  }
  button[disabled] {
    background-color: #80808085;
  }
</style>

<button {disabled} on:click>
  <slot />
</button>
