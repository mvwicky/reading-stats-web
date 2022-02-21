<script lang="ts">
  export let text: string;
  export let scope: string | undefined = "col";
</script>

<th {scope}>{text}</th>
