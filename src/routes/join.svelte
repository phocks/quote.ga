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

<div class="join">
  <div>Join</div>
  <form on:submit|preventDefault={handleSubmit}>
    <input required type="email" id="email" placeholder="email" />
    <input required type="password" id="password" placeholder="password" />
    <button type="submit">Submit</button>
  </form>
</div>

<style lang="scss">
  .join {
    width: 100%;
    text-align: center;

    form {
      input {
        display: block;
        margin: auto;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        width: 200px;
        font-family: inherit;
        color: inherit;
      }

      button {
        display: block;
        margin: auto;
        border: 2px solid #ccc;
        border-radius: 4px;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        width: 200px;
        font-family: inherit;
        color: inherit;
      }
    }
  }
</style>
