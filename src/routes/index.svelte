<script context="module" lang="ts">
</script>

<script lang="ts">
  import { user } from "$lib/db";
  // let user = supabase.auth.user();
  // import { user } from "$lib/sessionStore";
  // import { supabase } from "$lib/db";
  import Auth from "$lib/components/Auth.svelte";
  import Profile from "$lib/components/Profile.svelte";

  // user.set(supabase.auth.user());
  // supabase.auth.onAuthStateChange((_, session) => {
  //   user = session.user;
  // });

  // $: console.log($user);
</script>

<svelte:head>
  <!-- <title>Quote</title> -->
</svelte:head>

<div class="container">
  This is a test.

  <!-- <button>Login</button> -->
  <!-- {#if $user}
    <Profile />
  {:else}
    <Auth />
  {/if} -->
</div>

<style lang="scss">
  button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }

  .container {
    padding: 1rem;
  }
</style>
