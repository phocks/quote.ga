<script context="module">
</script>

<script lang="ts">
  import { supabase } from "$lib/db";

  let emailInput: string;
  let passwordInput: string;

  async function signInWithEmail() {
    const { user, error } = await supabase.auth.signIn({
      email: emailInput,
      password: passwordInput,
    });

    console.log(user, error);
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="flex-container">
  <input bind:value={emailInput} />
  <input type="password" bind:value={passwordInput} />
  <button on:click={signInWithEmail}>Sign in</button>
</div>

<style>
  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
</style>
