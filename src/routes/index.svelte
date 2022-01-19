<script context="module">
</script>

<script>
  import { createClient } from "@supabase/supabase-js";

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://pvzwfbhzshfzmwironld.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNDU1OTYxLCJleHAiOjE5NTgwMzE5NjF9.lsCybier2hm830WuR33QvyW3MSbiFK12ciQleP40TsQ"
  );

  console.log(supabase);
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section />

<style>
</style>
