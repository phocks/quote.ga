<script lang="ts">
  import "$lib/styles.css";
  import Navigtion from "$lib/components/Navigation.svelte";
</script>

<div class="main">
  <Navigtion />
  <slot />
</div>

<style lang="scss">
  .main {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #555;
    background-color: #cce9ff;
  }
</style>
