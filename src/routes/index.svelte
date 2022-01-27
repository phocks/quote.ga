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

<div class="container" style="padding: 50px 0 100px 0;">
  {#if $user}
    <Profile />
  {:else}
    <Auth />
  {/if}
</div>
