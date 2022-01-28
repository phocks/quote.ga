<script lang="ts">
  import { user } from "$lib/sessionStore";
  import { supabase } from "$lib/db";
  import Auth from "$lib/components/Auth.svelte";
  import Profile from "$lib/components/Profile.svelte";
  user.set(supabase.auth.user());
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session.user);
  });
</script>

<svelte:head>
  <!-- <title>Quote</title> -->
</svelte:head>

<div class="container">
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
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
