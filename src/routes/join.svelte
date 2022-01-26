<script context="module" lang="ts">
  // export async function load({ params, fetch, session, stuff }) {
  //   const url = `/api/login`;
  //   const res = await fetch(url);

  //   if (res.ok) {
  //     return {
  //       props: {
  //         article: await res.json(),
  //       },
  //     };
  //   }

  //   return {
  //     status: res.status,
  //     error: new Error(`Could not load ${url}`),
  //   };
  // }
</script>

<script lang="ts">
  import { supabase } from "$lib/db";

  const handleSubmit = async (event) => {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(user, session, error);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="email">Email</label>
  <input required type="email" id="email" />
  <br />
  <label for="password">Password</label>
  <input required type="password" id="password" />

  <button type="submit">Submit</button>
</form>

<style lang="scss">
</style>
