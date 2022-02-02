<script lang="ts">
  import "$lib/styles.css";
  import Navigtion from "$lib/components/Navigation.svelte";
import Navigation from "$lib/components/Navigation.svelte";
</script>

<div class="layout-root">
  <Navigation />
  <slot />
</div>

<style lang="scss">
  .layout-root {
    padding: 0;
  }
</style>
