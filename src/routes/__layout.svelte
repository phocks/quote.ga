<script lang="ts">
  
  import Navigtion from "$lib/components/Navigation.svelte";
</script>

<div class="main">
  <Navigtion />
  <div><slot /></div>
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

  :global(body) {
    margin: 0;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #111;
    background-color: #cce9ff;
  }
</style>
